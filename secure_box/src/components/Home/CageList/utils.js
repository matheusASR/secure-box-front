export const cages = [
  { number: 1, inUse: false },
  { number: 2, inUse: true },
  { number: 3, inUse: false },
  { number: 4, inUse: false },
  { number: 5, inUse: true },
  { number: 6, inUse: false },
  { number: 7, inUse: false },
  { number: 8, inUse: true },
  { number: 9, inUse: false },
  { number: 10, inUse: false },
];

export function updateCageInUse(cageNumber, inUseStatus) {
  const updatedCages = cages.map((cage) => {
    if (cage.number === cageNumber) {
      return { ...cage, inUse: inUseStatus };
    }
    return cage;
  });
  return updatedCages; 
}