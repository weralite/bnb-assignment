export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero if needed

    return `${day}/${month}`; // Return in DD/MM format
};