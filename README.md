# Reliquia · Guía Oficial del Juego

Página web (guía/wiki) del videojuego **Reliquia**, hecha con **HTML, CSS y JavaScript puro** (sin dependencias ni build).

## Secciones

- **Inicio / ¿Qué es Reliquia?** — explicación visual del juego.
- **Historia** — la leyenda de las reliquias en una línea de tiempo.
- **Items** — todos los items con buscador y filtros por categoría/rareza.
- **Combinaciones** — recetas para fusionar items.
- **Villanos** — de los más débiles a los Dioses (jefes finales de cada capítulo).
- **Mapa** — mapa interactivo del mundo con regiones.
- **Actualizaciones y Promociones** — novedades del juego.

## Estructura

```
index.html        Página principal (todas las secciones)
css/styles.css    Estilos y tema visual
js/data.js        Contenido del juego (items, villanos, etc.) — EDITA AQUÍ
js/main.js        Lógica e interactividad (render, filtros, mapa)
assets/img/       Imágenes (opcional)
```

## Cómo ver la página

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Cómo añadir contenido

Todo el contenido vive en `js/data.js`. Para añadir un item, villano,
combinación, región del mapa o noticia, simplemente agrega un objeto al
array correspondiente — la página se actualiza sola.
