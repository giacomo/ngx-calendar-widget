export interface DateAdapter {
    getMonth(date: Date): number;
    getYear(date: Date): number;
    startOfWeek(date: Date, options?: { weekStartsOn: number }): Date;
    addDays(date: Date, days: number): Date;
    addMonths(date: Date, months: number): Date;
    isSameMonth(dateLeft: Date, dateRight: Date): boolean;
    isWeekend(date: Date): boolean;
    isSameWeek(dateLeft: Date, dateRight: Date, options?: { weekStartsOn: number }): boolean;
    isSameDay(dateLeft: Date, dateRight: Date): boolean;
    isToday(date: Date): boolean;
    parseISO(dateString: string): Date;
    format(date: Date, formatString: string, options?: { locale?: any }): string;
    differenceInDays(laterDate: Date, earlierDate: Date): number;
    compareAsc(dateLeft: Date, dateRight: Date): number;
    getDay(date: Date): number;
}
