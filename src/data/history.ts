export interface HistoryContent {
  id: string;
  index: string;
  title: string;
  icon: 'timeline' | 'landmark' | 'layer' | 'book';
  paragraphs: string[];
  blockquote?: string;
  gridItems?: {
    title: string;
    description: string;
  }[];
}

export const historyHeader = {
  title: "Nuestra Historia",
  subtitle: "Toda gran revolución comienza con una idea clara. Descubre el camino de Entre Líneas, desde un grupo de amigos hasta un movimiento cultural nacional."
};

export const historyChapters: HistoryContent[] = [
  {
    id: "origins",
    index: "01",
    title: "Los Orígenes",
    icon: "timeline",
    paragraphs: [
      "Entre Líneas es una plataforma audiovisual y artística colombiana nacida de la unión de un núcleo de amigos vinculados por la disciplina del freestyle.",
      "Lo que inició como un vínculo de fraternidad evolucionó hacia una estructura profesional diseñada para otorgar visibilidad al talento, con presencia activa en Manizales, Chinchiná y Medellín.",
      "El origen del movimiento se sitúa en un entorno donde la rima improvisada contaba con estructuras establecidas, pero con limitada apertura hacia las nuevas propuestas. Los artistas emergentes enfrentaban barreras donde la trayectoria de los expertos funcionaba como un obstáculo para el relevo generacional."
    ]
  },
  {
    id: "philosophy",
    index: "02",
    title: "Filosofía y Propósito",
    icon: "landmark",
    paragraphs: [
      "Un pilar fundamental fue el fomento de espacios libres de violencia y consumo. Entre Líneas fue el único colectivo que defendió activamente esta premisa bajo la consigna:",
      "Para el fundador, Galáctico, Entre Líneas trasciende la definición de organización cultural; representa un proyecto de vida. Funciona como un ecosistema donde convergen la pasión por el arte y la necesidad de institucionalizar la cultura urbana."
    ],
    blockquote: "Entre Líneas es un espacio libre del consumo de sustancias psicoactivas y de la violencia"
  },
  {
    id: "structure",
    index: "03",
    title: "Estructura Institucional",
    icon: "layer",
    paragraphs: [
      "La profesionalización del arte urbano requiere una infraestructura sólida. Nuestra estructura se divide en ejes estratégicos que garantizan la calidad y sostenibilidad:"
    ],
    gridItems: [
      {
        title: "Diseño Visual",
        description: "Identidad gráfica y flyers propios para estética profesional."
      },
      {
        title: "Audiovisual",
        description: "Postproducción y edición de video de alta calidad."
      },
      {
        title: "Producción Musical",
        description: "Beatmaking y grabación de voces para artistas locales."
      },
      {
        title: "Gestión Jurídica",
        description: "Asesoría en copyright y propiedad intelectual."
      },
      {
        title: "Fomento a la Escena",
        description: "Patrocinio a otras competencias locales."
      },
      {
        title: "Eje Pedagógico",
        description: "Talleres y formación artística."
      }
    ]
  },
  {
    id: "vision",
    index: "04",
    title: "Visión de Expansión",
    icon: "book",
    paragraphs: [
      "La identidad de Entre Líneas se fundamenta en la recuperación de la plaza pública mediante tres pilares:",
      "Entornos Seguros: Espacios libres de consumo y vicios, garantizando un ambiente profesional donde el talento sea la prioridad.",
      "Inclusión Familiar: Acceso para familias y menores de edad, buscando la normalización del freestyle como una disciplina artística legítima frente a la sociedad.",
      "Cultura en Expansión: El movimiento se proyecta hacia una escala nacional, con el objetivo de descentralizar la cultura urbana y llevarla a cada rincón de Colombia."
    ]
  }
];
