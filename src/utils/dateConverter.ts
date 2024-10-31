
export function toISODateTime(date: string | null, time: string = "T00:00:00Z"): string | null {
    if (!date) return null;
    return `${date}${time}`;
}


export function fromISODateTime(isoDate: string | null): string | null {
    if (!isoDate) return null;
    
    const match = isoDate.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[0] : null; 
}
