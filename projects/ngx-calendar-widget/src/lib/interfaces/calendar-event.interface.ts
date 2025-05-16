export interface CalendarEventInterface {
    id: number|string;
    title: string;
    date: string;
    endDate: string|null;
    color?: string;
    textColor?: string;
}
