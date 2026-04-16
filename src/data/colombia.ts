export const COLOMBIA_CITIES = [
  "Manizales", // Priorizada por la naturaleza del proyecto
  "Bogotá D.C.",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cúcuta",
  "Bucaramanga",
  "Pereira",
  "Ibagué",
  "Santa Marta",
  "Villavicencio",
  "Bello",
  "Valledupar",
  "Montería",
  "Pastos",
  "Buenaventura",
  "Soacha",
  "Popayán",
  "Sincelejo",
  "Itagüí",
  "Tunja",
  "Neiva",
  "Armenia",
  "Riohacha",
  "Quibdó",
  "Mocoa",
  "Arauca",
  "San José del Guaviare",
  "Leticia",
  "Puerto Carreño",
  "Inírida",
  "San Andrés",
  "Mitú",
  "Chinchiná",
  "Villamaría",
  "OTRO / EXTRANJERO"
].sort((a, b) => {
  if (a === "Manizales") return -1;
  if (b === "Manizales") return 1;
  if (a === "OTRO / EXTRANJERO") return 1;
  if (b === "OTRO / EXTRANJERO") return -1;
  return a.localeCompare(b);
});
