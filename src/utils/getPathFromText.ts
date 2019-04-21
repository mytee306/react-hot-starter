export const getPathFromText = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .join('-')
    .padStart(1, '/');
