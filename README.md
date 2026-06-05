# RELIQUIA — Action-RPG móvil de temática azteca

Juego 2D para móvil (Android/iOS), construido como **un solo archivo HTML autocontenido** (HTML + JS + canvas, sin dependencias externas ni motor). Corre en cualquier navegador y está pensado para empaquetarse después como app (PWA/Capacitor). Las sesiones de desarrollo se llevan en español.

> **Estado:** prototipo jugable (fase alfa). Próximo gran paso: reemplazar el arte dibujado por código con **sprites pixel-art reales** (ver sección "Pendiente").

---

## Archivos

- **`index.html`** — el juego completo (2D). Es el producto real. Todo (HTML, CSS, JS, imágenes en base64) vive aquí.
- **`reliquia.html`** — copia exportada de `index.html` (mismo contenido; es lo que se entrega/prueba).
- **`reliquia3d.html`** — demo experimental en 3D (Three.js r128). **Secundaria, no es el producto.** Sirvió para explorar un look 3D; se decidió que el 2D es el camino para móvil. No invertir esfuerzo aquí salvo que se pida.

Todo el código del juego 2D está dentro de un único `<script>` en `index.html`.

---

## Cómo correr y validar

No hay build. Se abre el HTML en el navegador.

**Validación de sintaxis JS** (patrón usado en todo el proyecto antes de exportar):
```bash
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const s=html.match(/<script>([\s\S]*?)<\/script>/)[1];try{new Function(s);console.log('JS VALIDO');}catch(e){console.log('ERROR:',e.message);}"
```
Contar llaves NO es fiable (hay llaves dentro de strings). Usar siempre `new Function(s)`.

**Exportar:** copiar `index.html` a `reliquia.html`.

---

## Concepto del juego

Explorador débil llega al **Pueblo de Tenoch**, oprimido por un dios de piedra. Tema central:
**los secretos de las culturas antiguas no se leen, se ganan peleando** — cada batalla te hace más
fuerte Y te revela secretos. Esto justifica narrativamente la mecánica de progresión.

### Narrativa Capítulo I (borrador, sujeto a cambio)
1. Llegas débil a Tenoch, atraído por la leyenda de una reliquia.
2. El **Rey de Piedra** (dios-villano, coloso de piedra coronado de calaveras) oprime al pueblo desde su sueño bajo el templo.
3. Peleas en la cueva → ganas RESPETO y fuerza, descubres secretos, juntas 3 pistas.
4. Despiertas al Rey de Piedra y lo vences (es el villano final real, NO un guardián con giro).
5. Tomas la reliquia, liberas Tenoch. Gancho Cap. II: hay más dioses y reliquias en el mundo.

### Mecánicas clave
- **RESPETO** en vez de niveles: se gana peleando. Matar un tipo de monstruo NUEVO da bonus permanente de vitalidad/habilidad ("¡PRIMERA SANGRE!").
- **2 clases permanentes** elegidas de 3 (Asesino / Mago / Tanque), combinables.
- **Equipo** (arma/armadura) permanente, con durabilidad. Solo se desgasta contra jefes; se repara en la herrería; se rompe a 0%.
- **Oro** se farmea de monstruos, se gasta en tiendas.

---

## Arquitectura del código (index.html)

### Estado global
- `G` — objeto con todo el estado del juego: `scene` ('town'|'dungeon'), `px/py` (posición), `hp/maxhp`, `dir`, `running`, `alive`, clases, oro, respeto, equipo, `cluesFound`, `bossSpawned`, `godWarned`, y física lateral (`vy`, `grounded`, `gravity:0.7`, `jumpForce:13`).
- `mobs`, `clues`, `particles`, `boss` — entidades activas.
- `walls` — matriz de tipos de tile del mapa actual. `MAP_W`/`MAP_H` son **variables** (cambian según escena).
- `TILE` = tamaño de tile en px. Canvas lógico 320×576 aprox (vertical, móvil).

### Escenas (dos modos de juego en uno)
El juego tiene **dos vistas distintas** según `G.scene`:

**MUNDO DE TENOCH (`'town'`) — vista cenital (top-down), overworld abierto (principio tipo Kanto):**
- Mapa **generado por código** en `buildTown()` (44×40, cámara que recorre). Base de **bosque (árboles sólidos)**; las **rutas-corredor** y los **claros/regiones** se tallan como hierba transitable. `TOWN_ART`/`TOWN_INFO` se llenan ahí; `buildingAt()` consulta `TOWN_INFO["x,y"]`.
- **Villa de Tenoch** (hub, sur): plaza con fuente, 6 edificios (ARMERÍA/Ataque · ARMADURÍA/Defensa · BOTICA/Pociones · SANTUARIO/Potenciadores · TÓTEM/Encantamiento · HERRERÍA/Reparar) + 2 NPCs (Anciano, Mercader) con consejos y pista del objeto sagrado.
- **3 cuevas ya hechas y enterables** (`kind:'cave'`): CUEVA DEL TEMPLO (norte, jefe Cap. I), CUEVA DE JADE (oeste), GRUTA SOMBRÍA (este). Por ahora todas cargan el mismo `CAVE_ART`; `enterDungeon(full,name)` setea el nombre mostrado. **Escalado a 10 capítulos:** la idea es parametrizar `buildTown` por región/capítulo y conectar regiones por bordes.
- Tiendas nuevas: `SHOP_POWERS` (mejoras permanentes a stats base, en `G.powers`) y `SHOP_ENCHANTS` (modifican el arma/armadura equipada). `renderShop`/`buyItem` manejan los kinds `powerups` y `enchant`.
- Movimiento en 4 direcciones, sin gravedad ni combate. Colisión vía `solid()`/`SOLID_TYPES`. Hierba y caminos transitables; árboles/agua/edificios bloquean.

**CUEVA (`'dungeon'`) — vista lateral tipo plataformas (estilo Metal Slug en mecánica):**
- **Progresión por niveles (Capítulo I = 15 niveles + jefe):** `genCave(level)` genera cada nivel (RNG determinista `lrng`), escalando ancho, cantidad/variedad de enemigos y stats (`spawnMob(...,lvl)`). `loadLevel()` arma el nivel actual (`curCaveArt`), `advanceLevel()` pasa al siguiente. Al pasar el nivel 15 → `genArena()` + `spawnBoss()`. `G.level`/`G.levelsTotal`.
- **Portal de salida** (`portal`) al fondo derecha: al alcanzarlo avanzas de nivel (se cura al 100% al entrar a cada nivel). El HUD muestra `NIVEL x/15`.
- **Física de plataformas:** gravedad, salto (↑/W/touchDir.up), movimiento solo izquierda/derecha.
- Colisión vía `solidSide()` — solo el tile tipo 20 (roca) bloquea. `isRock(x,y)` para bordes orgánicos. Suelo en las 2 filas de abajo; plataformas a varias alturas.
- Combate cuerpo a cuerpo (golpe hacia los lados según `G.dir`).
- Enemigos terrestres (baba/reptil/araña/guardián) tienen gravedad; **espectros y murciélagos vuelan** (flag `flying` en `MOB_TYPES`). El murciélago aletea errático en vertical.
- Jefe (Rey de Piedra) aparece al fondo derecha, persigue horizontal con gravedad, lanza rocas en abanico.

### Mapas y tiles
- `CHAR2TYPE` mapea caracteres del arte ASCII a tipos numéricos.
- Tipos pueblo: 10 piedra, 11 pared(sólido), 12 puerta, 13 cueva, 14 NPC(sólido), 15 tejado.
- Tipos cueva: **20 roca(sólido)**, 21 aire, 22 antorcha.
- `buildMap()` arma `walls` y ajusta `MAP_W/MAP_H` según escena.
- **IMPORTANTE:** cada fila de `CAVE_ART` debe tener EXACTAMENTE 40 chars. Validar tras editar.

### Bucle principal
- `loop()` → `update()` + `render()` + `requestAnimationFrame`.
- `update()` controla la visibilidad de los botones de combate (`#action-zone`) en CADA frame, antes de cualquier `return` temprano (visible solo en 'dungeon'). Esto evita bugs de estado.
- `update()` ramifica: rama pueblo (cenital) vs rama cueva (lateral con gravedad).

### Render
- Dos pasadas de tiles: base (suelo/aire) y objetos altos (árboles, edificios, antorchas).
- Funciones de dibujo por código (NO sprites): `drawHero` (explorador con sombrero/mochila, por clase), `drawMob` (baba/reptil/espectro/murcielago/arana/guardian), `drawCaveRock/drawCaveAir/drawTorch` (cueva atmosférica con estalactitas, vetas, bordes orgánicos), `drawStone/drawGrass/drawWater/...` (pueblo).
- `applyZoneTint()` — atmósfera: cueva oscura/cálida con luz radial cerca del jugador; pueblo dorado suave.
- Helpers: `vGrad` (gradiente vertical), `cellRnd(x,y,seed)` (ruido determinista por celda), `px2` (rect rápido).
- Overlay CRT/scanlines opcional (tecla C).

### Imágenes (base64 embebidas)
- Portada: dios azteca de fondo.
- **Rey de Piedra** (`rey_b64`): usado en el modal de advertencia al entrar a la cueva Y en la pantalla de presentación del jefe.
- Se incrustan con Python/PIL (resize ~420-440px, JPEG q82-83) para mantener el archivo autocontenido.

### Momentos cinemáticos (tratados como features, no adorno)
- **Intro narrativa:** 5 páginas tras JUGAR, antes de elegir clase (`INTRO_PAGES`, `startIntro/showIntroPage`). Con botón SALTAR.
- **Modal de advertencia del dios:** primera vez que entras a la cueva, `showGodModal()` con efecto de tipeo (`GOD_LINES`). Controlado por `G.godWarned`.
- **Presentación del jefe:** `showBossIntro()` — retrato del Rey de Piedra, nombre, barra que se llena, temblor; ~3.5s y empieza la pelea.

### Controles
- Teclado: WASD/flechas mover; en cueva ↑/W salta; J golpe; K habilidad; L poción; C CRT.
- Táctil: D-pad + botones GOLPE/HAB. En cueva, "arriba" del D-pad salta.

---

## Decisiones de diseño tomadas (no revertir sin razón)

- **2D es el producto**, 3D es experimento secundario.
- **HTML/JS/canvas** es el camino correcto para móvil ligero. **F# se descartó** (no apto para juegos en este entorno; no se puede correr/probar aquí).
- El **Rey de Piedra es villano real**, no guardián con giro.
- El **héroe se mantiene de tamaño humano / pequeño** — empieza débil; NO hacerlo grande/imponente (rompería la coherencia narrativa).
- Pueblo cenital + cueva lateral (dos estilos integrados, decisión deliberada).
- La visibilidad de botones de combate se controla cada frame (bug histórico).

---

## Pendiente / próximos pasos

### 1. SPRITES REALES (prioridad actual, paso grande)
El arte dibujado por código tiene techo: se ve geométrico. Para lograr look tipo **Metal Slug** se necesitan
**sprites pixel-art reales** (PNG) hechos por artistas; el código solo los coloca/anima.
- Personaje elegido para integrar: **"Animated Pixel Adventurer" de rvros** (`rvros.itch.io/animated-pixel-hero`) — aventurero con animaciones idle/run/jump/attack/hit/death.
- Faltan: tileset de cueva y enemigos en estilo/tamaño de pixel COMPATIBLE (mismo "grosor" de pixel; idealmente del mismo artista).
- **Tarea de integración:** cargar las spritesheets, recortar frames, animar según estado (idle/run/jump/attack), reemplazar las funciones `drawHero`/`drawMob`/tiles de cueva por blit de sprites. Mantener fallback por código por si falta un asset.
- Verificar **licencia** de cada asset (uso comercial permitido; dar crédito si se pide).

### 2. Otros
- Diseño Capítulo II (más dioses/reliquias, alcance mundial).
- Balance/progresión (números: precios, daño, durabilidad, respeto necesario).
- Más contenido de cueva (niveles, sub-jefes, variedad de monstruos).
- Guardado: actualmente solo en memoria de sesión (`savedGame`), no en disco/localStorage.
- Empaquetado como app (PWA/Capacitor) — diferido hasta terminar diseño.

---

## Notas para quien continúe (Claude Code)

- Trabajar en **`index.html`**; exportar a `reliquia.html` al terminar.
- **Validar JS con `new Function(s)`** antes de cada exportación.
- Al editar `CAVE_ART`, verificar que TODAS las filas midan 40 chars.
- No romper la separación town(cenital)/dungeon(lateral) ni la física de plataformas.
- Mantener el archivo **autocontenido** (imágenes en base64, sin dependencias externas) para que siga corriendo en cualquier móvil.
- Sesiones en español.

---

## Créditos
- **Programación:** Emiliano "Che" Gallegos
- **Diseño de historia y personajes:** Vary Schedar Roman Delgado
