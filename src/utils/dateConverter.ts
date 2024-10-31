// utils/dateConverter.ts

/**
 * Converts a date string (YYYY-MM-DD) to ISO-8601 format with a fixed time component.
 * @param date - The date string to convert (e.g., "2024-10-16").
 * @param time - The time to append, defaults to "T00:00:00Z".
 * @returns The formatted ISO-8601 date string or null if input is invalid.
 */
export function toISODateTime(date: string | null, time: string = "T00:00:00Z"): string | null {
    if (!date) return null;
    return `${date}${time}`;
}

/**
 * Converts an ISO-8601 date string to a simple date string (YYYY-MM-DD).
 * @param isoDate - The ISO-8601 date string to convert.
 * @returns The simple date string or null if input is invalid.
 */
export function fromISODateTime(isoDate: string | null): string | null {
    if (!isoDate) return null;
    
    const match = isoDate.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[0] : null; // Return the YYYY-MM-DD part
}
