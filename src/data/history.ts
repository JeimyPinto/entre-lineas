export interface HistoryContent {
  id: string;
  index: string;
  title: string;
  icon: 'timeline' | 'landmark' | 'layer' | 'book';
  paragraphs: string[];
  blockquote?: string;
  gridItems?: { title: string; description: string }[];
}

export const historyHeader = {
  title: "Historia",
  subtitle: "Conoce nuestra historia y evolución como proyecto cultural"
};

export const historyChapters: HistoryContent[] = [
  {
    id: "chapter-1",
    index: "01",
    title: "Los Inicios",
    icon: "timeline",
    paragraphs: [
      "Entre Líneas nació en 2020 como una iniciativa para documentar y promover la cultura urbana en Manizales, Colombia.",
      "Todo comenzó con un grupo de amigos apasionados por el hip-hop, el rap y el freestyle que decidieron crear un espacio para mostrar el talento local."
    ]
  },
  {
    id: "chapter-2", 
    index: "02",
    title: "Crecimiento y Eventos",
    icon: "landmark",
    paragraphs: [
      "A lo largo de los años, hemos organizado diversos eventos, batallas de freestyle y sesiones live que han convocado a artistas de todo el país.",
      "Nuestra comunidad ha crecido significativamente, logrando estables conexiones con artistas de Medellín, Bogotá, Cali y otras ciudades."
    ]
  },
  {
    id: "chapter-3",
    index: "03", 
    title: "Expansión Digital",
    icon: "layer",
    paragraphs: [
      "Con el surgimiento de plataformas como YouTube e Instagram, expandimos nuestro alcance hacia el público digital.",
      "Hoy mantenemos un canal activo donde compartimos videos de competencias, entrevistas y contenido original."
    ]
  },
  {
    id: "chapter-4",
    index: "04",
    title: "Presente y Futuro", 
    icon: "book",
    paragraphs: [
      "Actualmente Entre Líneas continúa siendo un faro para la comunidad urbana en Colombia, promoviendo valores positivos a través del arte.",
      "Nuestro compromiso es seguir creciendo y brindando oportunidades a los nuevos talentos de la escena."
    ]
  }
];
