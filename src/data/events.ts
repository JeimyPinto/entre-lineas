export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  postUrl: string;
  youtubeLink?: string;
  judges: {
    name: string;
    image?: string;
    artistId?: string;
  }[];
  host?: {
    name: string;
    image?: string;
    artistId?: string;
  }[];
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Entre Líneas - Edición 1",
    date: "Miércoles 11 de Octubre, 2023",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/CyEVBrAJvwT/",
    youtubeLink: "https://www.youtube.com/watch?v=d7kQ0Y7vYMU&list=PLEx1HjsJeKEf1NqkqYJoDXFeTWgKeF3Ld",
    judges: [
      { name: "Galáctico", image: "/artists/galactico.jpg", artistId: "galactico" },
      { name: "Sr Prisma" },
      { name: "Ser", artistId: "zer" }
    ]
  },
  {
    id: 2,
    title: "Entre Líneas - Edición 2",
    date: "Miércoles 8 de Noviembre, 2023",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/CzM2mT0vH7I/",
    youtubeLink: "https://www.youtube.com/watch?v=7imwZJ8zgy4&list=PLEx1HjsJeKEcrIjm1FZNLXxshPxefnbwl",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Cosmic" },
      { name: "Murz", artistId: "murz" }
    ]
  },
  {
    id: 3,
    title: "Entre Líneas - Edición 3",
    date: "Miércoles 22 de Noviembre, 2023",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/CzzVUvevetC/",
    youtubeLink: "https://www.youtube.com/watch?v=yqOTxT1cTuQ&list=PLEx1HjsJeKEcn2o76NGngv_8md0DzX3K8",
    judges: [
      { name: "Diaz", artistId: "diaz" },
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Murz", artistId: "murz" }
    ]
  },
  {
    id: 4,
    title: "Entre Líneas - Edición 4",
    date: "Viernes 01 de Diciembre, 2023",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C0LEG0ntATS/",
    youtubeLink: "https://www.youtube.com/watch?v=lQGk0DDR-OI&list=PLEx1HjsJeKEdHEHkxCtW0-g-6YhFUPGy5",
    judges: [
      { name: "Diaz", artistId: "diaz" },
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Murz", artistId: "murz" }
    ]
  },
  {
    id: 5,
    title: "Entre Líneas - Edición 5",
    date: "Miércoles 20 de Marzo, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C4ikRhcsySw/",
    youtubeLink: "https://www.youtube.com/watch?v=lQGk0DDR-OI&list=PLEx1HjsJeKEdHEHkxCtW0-g-6YhFUPGy5",
    judges: [
      { name: "Diaz", artistId: "diaz" },
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Malcolm", artistId: "malcolm" }
    ]
  },
  {
    id: 6,
    title: "Entre Líneas - Edición 6",
    date: "Miércoles 10 de Abril, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C5g84NVPGPZ/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
    youtubeLink: "https://www.youtube.com/watch?v=lQGk0DDR-OI&list=PLEx1HjsJeKEdHEHkxCtW0-g-6YhFUPGy5",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Raigo", artistId: "raigo" },
      { name: "Zer", artistId: "zer" }
    ]
  },
  {
    id: 7,
    title: "Entre Líneas - Edición 7",
    date: "Sábado 13 de Abril, 2024",
    location: "Chinchiná, Colombia",
    postUrl: "https://www.instagram.com/p/C5qiMhVrK8H/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    youtubeLink: "https://www.youtube.com/watch?v=lQGk0DDR-OI&list=PLEx1HjsJeKEdHEHkxCtW0-g-6YhFUPGy5",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Diaz", artistId: "diaz" },
      { name: "Samply", artistId: "samply" }
    ]
  },
  {
    id: 8,
    title: "Entre Líneas - Edición 8",
    date: "Miercoles 8 de Mayo, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C6pu_jqtXzi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Zer", artistId: "zer" },
      { name: "Cris", artistId: "cris" }
    ]
  },
  {
    id: 9,
    title: "Entre Líneas - Edición 9",
    date: "Miercoles 22 de Mayo, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C7Ms2bF-LmeN/",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "KZQ", artistId: "kZQ" },
      { name: "Emebe", artistId: "emebe" }
    ]
  },
  {
    id: 10,
    title: "Entre Líneas - Edición 10",
    date: "Miercoles 5 de Junio, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C7qxWY-O-b1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Jocker", artistId: "jocker" },
      { name: "Malckom", artistId: "malckom" }
    ]
  },
  {
    id: 11,
    title: "Entre Líneas - Edición 11",
    date: "Miercoles 19 de Junio, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C8Sp6siv7pi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Zalazar", artistId: "zalazar" },
      { name: "Raigo", artistId: "raigo" }
    ]
  },
  {
    id: 12,
    title: "Entre Líneas - Edición 12",
    date: "Miercoles 3 de Julio, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C86ixrJO1N5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Candela", artistId: "candela" },
      { name: "Mambo", artistId: "mambo" }
    ]
  },
  {
    id: 13,
    title: "Entre Líneas - Edición 13",
    date: "Miercoles 07 de Agosto, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C-QaTmnPQzC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Nemexiz", artistId: "nemexiz" },
      { name: "Galáctico", artistId: "galactico" },
      { name: "Cosmic", artistId: "cosmic" },
      { name: "Ray", artistId: "ray" },
      { name: "Malckom", artistId: "malckom" },
      { name: "Enfasix", artistId: "enfasix" }
    ],
    host: [
      { name: "Arenik", artistId: "arenik" },
      { name: "Zer", artistId: "zer" }
    ]
  },
  {
    id: 14,
    title: "Entre Líneas - Edición 14 - Rookies",
    date: "Sábado 24 de Agosto, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C_CRVH-tgaE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Zalazar", artistId: "zalazar" },
      { name: "Galáctico", artistId: "galactico" },
      { name: "Cosmic", artistId: "cosmic" }
    ]
  },
  {
    id: 15,
    title: "Entre Líneas - Edición 15 - Stars",
    date: "Miercoles 28 de Agosto, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C_JmYhLvMDl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Zalazar", artistId: "zalazar" },
      { name: "Raigo", artistId: "raigo" }
    ]
  },
  {
    id: 16,
    title: "Entre Líneas - Edición 16 - Cupo a BDM regional",
    date: "Miercoles 11 de Septiembre, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/C_tNYhQvWaz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Ray", image: "/artists/ray.jpg", artistId: "ray" },
      { name: "Raigo", artistId: "raigo" },
      { name: "Zalazar", artistId: "zalazar" }
    ],
    host: [
      { name: "Zinhiloz", artistId: "zinhiloz" }
    ]
  },
  {
    id: 17,
    title: "Entre Líneas - Edición 17 - Rookies",
    date: "Domingo 29 de Septiembre, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/DAT6_9yvl72/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Sonkey", artistId: "sonkey" },
      { name: "Hostil", artistId: "hostil" },
      { name: "Zaku", artistId: "zaku" }
    ]
  },
  {
    id: 18,
    title: "Entre Líneas - Edición 18 - Cupo a BDM regional",
    date: "Domingo 13 de Octubre, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/DA5HmeMxkNh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Sonkey", artistId: "sonkey" },
      { name: "Zaku", artistId: "zaku" },
      { name: "Emebe", artistId: "emebe" }
    ],
    host: [
      { name: "Puma", artistId: "puma" }
    ]
  },
  {
    id: 19,
    title: "Entre Líneas - Edición 19 - Cupo a BDM regional",
    date: "Miercoles 23 de Octubre, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/DAT6_9yvl72/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Raigo", artistId: "raigo" },
      { name: "Diaz", artistId: "diaz" },
      { name: "Ray", artistId: "ray" }
    ],
    host: [
      { name: "Puma", artistId: "puma" }
    ]
  },
  {
    id: 20,
    title: "Entre Líneas - Edición 20",
    date: "Miercoles 27 de Noviembre, 2024",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/DAT6_9yvl72/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Shoot", artistId: "shoot" },
      { name: "Leona", artistId: "leona" },
      { name: "Ray", artistId: "ray" }
    ]
  },
  {
    id: 21,
    title: "Entre Líneas - Edición 21",
    date: "Miercoles 11 de Junio, 2025",
    location: "Manizales, Colombia",
    postUrl: "https://www.instagram.com/p/DKmvS7CxPkz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Zaku", artistId: "zaku" },
      { name: "Leona", artistId: "leona" },
      { name: "Raigo", artistId: "raigo" }
    ],
    host: [
      { name: "Sonkey", artistId: "sonkey" }
    ]
  },
  {
    id: 22,
    title: "Entre Líneas - Edición 22",
    date: "Sábado 11 de Octubre, 2025",
    location: "Medellin, Colombia",
    postUrl: "https://www.instagram.com/p/DKmvS7CxPkz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Sirius", artistId: "sirius" },
      { name: "Kza", artistId: "kza" },
      { name: "Clezart", artistId: "clezart" }
    ],
    host: [
      { name: "Syd", artistId: "syd" }
    ]
  },
  {
    id: 23,
    title: "Entre Líneas - Edición 23",
    date: "Domingo 25 de Enero, 2026",
    location: "Medellin, Colombia",
    postUrl: "https://www.instagram.com/p/DTsQjdtFRa9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Chris Re", artistId: "chrisre" },
      { name: "Tiago", artistId: "tiago" },
      { name: "Kza", artistId: "kza" }
    ]
  },
  {
    id: 24,
    title: "Entre Líneas - Edición 24",
    date: "Domingo 22 de Febrero, 2026",
    location: "Medellin, Colombia",
    postUrl: "https://www.instagram.com/p/DU1tnkOjQ30/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Poeta de Marfil", artistId: "poetademarfil" },
      { name: "Tiago", artistId: "tiago" },
      { name: "Ds", artistId: "ds" }
    ]
  },
  {
    id: 25,
    title: "Entre Líneas - Edición 25",
    date: "Sábado 28 de Marzo, 2026",
    location: "Medellin, Colombia",
    postUrl: "https://www.instagram.com/p/DWPprLYDge9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    judges: [
      { name: "Kza", artistId: "kza" },
      { name: "Poeta de Marfil", artistId: "poetademarfil" },
      { name: "Ds", artistId: "ds" }
    ]
  }
];
