/**
 * Calculates the difference in days between two dates.
 * @param checkInDate - The check-in date.
 * @param checkOutDate - The check-out date.
 * @returns The difference in days between the two dates.
 */
export function calculateDaysDifference(checkInDate: Date, checkOutDate: Date): number {

    const differenceInMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
  

    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    return Math.ceil(differenceInDays); 
  }