
export function calculateDaysDifference(checkInDate: Date, checkOutDate: Date): number {

    const differenceInMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
  

    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    return Math.ceil(differenceInDays); 
  }