/* ============================================================
   RELIQUIA · Datos del juego
   Edita este archivo para añadir/cambiar contenido fácilmente.
   ============================================================ */

const DATA = {

  /* ---------- HISTORIA (línea de tiempo) ---------- */
  timeline: [
    { era: "Era I · El Origen", title: "La Forja Divina", text: "Los siete Dioses crearon el mundo y forjaron las primeras reliquias para contener su poder." },
    { era: "Era II · La Fractura", title: "La Gran Guerra", text: "Los Dioses lucharon entre sí. Las reliquias se dispersaron y el mundo quedó dividido en regiones." },
    { era: "Era III · El Olvido", title: "El Sello", text: "Para evitar la destrucción total, los Dioses sellaron su esencia y cayeron en un sueño eterno." },
    { era: "Era IV · El Despertar", title: "Tu Aventura", text: "Eres el Buscador. Reúne las reliquias, derrota a los villanos y decide el destino del mundo." }
  ],

  /* ---------- ITEMS ---------- */
  itemCategories: ["Todos", "Armas", "Armaduras", "Reliquias", "Pociones", "Materiales"],
  items: [
    { name: "Espada del Alba", emoji: "🗡️", cat: "Armas", rarity: "legendary", desc: "Inflige daño sagrado a los no-muertos." },
    { name: "Daga Sombría", emoji: "🔪", cat: "Armas", rarity: "rare", desc: "Aumenta el daño de golpes críticos." },
    { name: "Martillo de Trueno", emoji: "🔨", cat: "Armas", rarity: "epic", desc: "Aturde enemigos en un área." },
    { name: "Arco Estelar", emoji: "🏹", cat: "Armas", rarity: "epic", desc: "Dispara flechas guiadas por las estrellas." },
    { name: "Báculo Arcano", emoji: "🪄", cat: "Armas", rarity: "rare", desc: "Potencia la magia elemental." },
    { name: "Coraza del Titán", emoji: "🛡️", cat: "Armaduras", rarity: "legendary", desc: "Reduce el daño recibido en un 40%." },
    { name: "Yelmo de Hierro", emoji: "⛑️", cat: "Armaduras", rarity: "common", desc: "Protección básica para la cabeza." },
    { name: "Capa del Viajero", emoji: "🧥", cat: "Armaduras", rarity: "rare", desc: "Aumenta la velocidad de movimiento." },
    { name: "Botas Aladas", emoji: "🥾", cat: "Armaduras", rarity: "epic", desc: "Permite un doble salto en combate." },
    { name: "Reliquia del Sol", emoji: "🌞", cat: "Reliquias", rarity: "legendary", desc: "Fragmento del Dios de la Luz." },
    { name: "Reliquia de la Luna", emoji: "🌙", cat: "Reliquias", rarity: "legendary", desc: "Otorga visión nocturna y sigilo." },
    { name: "Corazón de Cristal", emoji: "💠", cat: "Reliquias", rarity: "epic", desc: "Aumenta la vida máxima permanentemente." },
    { name: "Ojo del Abismo", emoji: "👁️", cat: "Reliquias", rarity: "epic", desc: "Revela enemigos ocultos en el mapa." },
    { name: "Poción de Vida", emoji: "🧪", cat: "Pociones", rarity: "common", desc: "Restaura 50 puntos de salud." },
    { name: "Poción de Maná", emoji: "🔵", cat: "Pociones", rarity: "common", desc: "Restaura energía mágica." },
    { name: "Elixir de Furia", emoji: "🍷", cat: "Pociones", rarity: "rare", desc: "Aumenta el ataque por 30 segundos." },
    { name: "Lágrima Curativa", emoji: "💧", cat: "Pociones", rarity: "epic", desc: "Revive con la mitad de la vida." },
    { name: "Lingote de Mithril", emoji: "🪙", cat: "Materiales", rarity: "rare", desc: "Metal raro para forjar armas legendarias." },
    { name: "Esquirla Divina", emoji: "✨", cat: "Materiales", rarity: "legendary", desc: "Fragmento dejado por un Dios derrotado." },
    { name: "Madera Ancestral", emoji: "🪵", cat: "Materiales", rarity: "common", desc: "Material básico de crafteo." },
    { name: "Cristal de Vacío", emoji: "🔮", cat: "Materiales", rarity: "epic", desc: "Energía pura del Abismo." },
    { name: "Pluma de Fénix", emoji: "🪶", cat: "Materiales", rarity: "epic", desc: "Componente para objetos de resurrección." }
  ],

  /* ---------- COMBINACIONES ---------- */
  recipes: [
    { name: "Espada del Alba", a: ["🗡️","Espada Vieja"], b: ["✨","Esquirla Divina"], r: ["🗡️","Espada del Alba"], note: "Requiere yunque sagrado y nivel 20." },
    { name: "Lágrima Curativa", a: ["🧪","Poción de Vida"], b: ["🪶","Pluma de Fénix"], r: ["💧","Lágrima Curativa"], note: "Combina en el altar de los caídos." },
    { name: "Coraza del Titán", a: ["🛡️","Coraza"], b: ["🪙","Mithril x3"], r: ["🛡️","Coraza del Titán"], note: "Sube la defensa al máximo." },
    { name: "Botas Aladas", a: ["🥾","Botas"], b: ["🪶","Pluma de Fénix"], r: ["🥾","Botas Aladas"], note: "Desbloquea el doble salto." },
    { name: "Ojo del Abismo", a: ["👁️","Ojo Roto"], b: ["🔮","Cristal de Vacío"], r: ["👁️","Ojo del Abismo"], note: "Solo en la región del Abismo." },
    { name: "Elixir de Furia", a: ["🍷","Vino"], b: ["🔴","Esencia Roja"], r: ["🍷","Elixir de Furia"], note: "+30% ataque temporal." }
  ],

  /* ---------- VILLANOS (de débil a Dios) ---------- */
  tiers: {
    debil:  { label: "Débil",     color: "#9aa3b2" },
    medio:  { label: "Medio",     color: "#4ea3ff" },
    elite:  { label: "Élite",     color: "#b15cff" },
    jefe:   { label: "Jefe",      color: "#d6455f" },
    dios:   { label: "Dios",      color: "#e8c46a" }
  },
  villains: [
    { name: "Goblin Saqueador", emoji: "👺", tier: "debil", chapter: "Cap. 1 · Bosque", desc: "Enemigo común que ataca en grupo.", stats: { Vida: 20, Ataque: 15, Magia: 5 } },
    { name: "Esqueleto Guerrero", emoji: "💀", tier: "debil", chapter: "Cap. 1 · Cripta", desc: "No-muerto débil al daño sagrado.", stats: { Vida: 30, Ataque: 25, Magia: 0 } },
    { name: "Lobo del Hielo", emoji: "🐺", tier: "medio", chapter: "Cap. 2 · Tundra", desc: "Rápido y ataca en manada.", stats: { Vida: 45, Ataque: 40, Magia: 20 } },
    { name: "Bruja del Pantano", emoji: "🧙‍♀️", tier: "medio", chapter: "Cap. 2 · Pantano", desc: "Lanza venenos a distancia.", stats: { Vida: 50, Ataque: 35, Magia: 60 } },
    { name: "Golem de Obsidiana", emoji: "🗿", tier: "elite", chapter: "Cap. 3 · Volcán", desc: "Defensa altísima, lento pero letal.", stats: { Vida: 80, Ataque: 55, Magia: 30 } },
    { name: "Caballero Maldito", emoji: "🛡️", tier: "elite", chapter: "Cap. 4 · Castillo", desc: "Antiguo héroe corrompido por el Abismo.", stats: { Vida: 75, Ataque: 70, Magia: 45 } },
    { name: "Hidra del Abismo", emoji: "🐉", tier: "jefe", chapter: "Cap. 5 · Abismo", desc: "Jefe de capítulo con tres cabezas regenerativas.", stats: { Vida: 90, Ataque: 80, Magia: 70 } },
    { name: "Señor del Vacío", emoji: "👁️", tier: "jefe", chapter: "Cap. 6 · Vacío", desc: "Manipula el espacio y teletransporta.", stats: { Vida: 95, Ataque: 85, Magia: 90 } },
    { name: "Solaris, Dios del Sol", emoji: "☀️", tier: "dios", chapter: "Cap. 7 · Trono Celeste", desc: "Jefe final. Domina la luz y el fuego sagrado.", stats: { Vida: 100, Ataque: 95, Magia: 100 } },
    { name: "Nyxa, Diosa de la Noche", emoji: "🌑", tier: "dios", chapter: "Cap. 7 · Trono Oscuro", desc: "Jefe final. Devora la luz y controla las sombras.", stats: { Vida: 100, Ataque: 90, Magia: 100 } }
  ],

  /* ---------- MAPA (regiones; x/y en % del contenedor) ---------- */
  regions: [
    { name: "Bosque de Eldra", x: 22, y: 30, tag: "Cap. 1", desc: "Zona inicial llena de goblins y secretos entre los árboles." },
    { name: "Tundra Helada", x: 50, y: 18, tag: "Cap. 2", desc: "Páramos congelados habitados por lobos y bestias del hielo." },
    { name: "Volcán Ígneo", x: 75, y: 35, tag: "Cap. 3", desc: "Tierras de lava donde habitan los golems de obsidiana." },
    { name: "Castillo Maldito", x: 38, y: 58, tag: "Cap. 4", desc: "Fortaleza de los caballeros corrompidos por el Abismo." },
    { name: "El Abismo", x: 62, y: 70, tag: "Cap. 5", desc: "Grieta sin fondo donde acecha la Hidra del Abismo." },
    { name: "El Vacío", x: 85, y: 60, tag: "Cap. 6", desc: "Realidad rota donde el espacio y el tiempo se distorsionan." },
    { name: "Trono Celeste", x: 50, y: 86, tag: "Cap. 7", desc: "Morada de los Dioses. El enfrentamiento final." }
  ],

  /* ---------- ACTUALIZACIONES / PROMOCIONES ---------- */
  news: [
    { type: "update", tag: "Actualización", emoji: "🆕", date: "5 jun 2026", title: "Parche 1.4 · El Despertar", text: "Nuevo capítulo, rebalanceo de villanos y 8 items legendarios añadidos.", color: "#1c2740" },
    { type: "promo", tag: "Promoción", emoji: "🎁", date: "1 jun 2026", title: "Pack Fundador -50%", text: "Consigue la Espada del Alba y skins exclusivas por tiempo limitado.", color: "#2a2410" },
    { type: "event", tag: "Evento", emoji: "🔥", date: "28 may 2026", title: "Asalto a los Dioses", text: "Evento PvE cooperativo: derrota a Solaris y gana recompensas únicas.", color: "#2a1218" },
    { type: "update", tag: "Actualización", emoji: "⚙️", date: "15 may 2026", title: "Mejoras de rendimiento", text: "Optimización del mapa y corrección de bugs en combinaciones.", color: "#1c2740" }
  ]
};
