export const validateId = (id: number): number | null => {
  const idData = Number(id);

  if (isNaN(idData)) return null;
  return idData;
};
