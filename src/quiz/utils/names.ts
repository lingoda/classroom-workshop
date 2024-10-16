const randomNames = [
  "Lucas",
  "Matteo",
  "Aleksander",
  "Jakob",
  "Niels",
  "Olivier",
  "Daan",
  "Andrzej",
  "Lars",
  "Viktor",
  "Sofia",
  "Amélie",
  "Emilia",
  "Isabella",
  "Klara",
  "Elina",
  "Marta",
  "Freja",
  "Anja",
  "Katarina",
];

let cachedName: string | null = null;

export const getRandomName = () => {
  if (cachedName) {
    return cachedName;
  }

  cachedName = randomNames[Math.floor(Math.random() * randomNames.length)];

  return cachedName;
};
