import {
    getMonth,
    getYear,
    startOfWeek,
    addDays,
    addMonths,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO,
    format, Day,
    isWeekend,
    isSameWeek,
    differenceInDays,
    compareAsc,
    getDay
} from 'date-fns';
import { DateAdapter } from '../interfaces/date-adapter.interface';

export class DateFnsDateAdapter implements DateAdapter {
    getMonth(date: Date): number {
        return getMonth(date);
    }

    getYear(date: Date): number {
        return getYear(date);
    }

    startOfWeek(date: Date, options?:  { weekStartsOn: number } | undefined): Date {
        const transformedOptions = options ? { weekStartsOn: options.weekStartsOn as Day } : undefined;
        return startOfWeek(date, transformedOptions);
    }

    addDays(date: Date, days: number): Date {
        return addDays(date, days);
    }

    addMonths(date: Date, months: number): Date {
        return addMonths(date, months);
    }

    isSameMonth(dateLeft: Date, dateRight: Date): boolean {
        return isSameMonth(dateLeft, dateRight);
    }

    isWeekend(date: Date): boolean {
        return isWeekend(date);
    }

    isSameWeek(dateLeft: Date, dateRight: Date, options?: { weekStartsOn: number } | undefined): boolean {
        const transformedOptions = options ? { weekStartsOn: options.weekStartsOn as Day } : undefined;
        return isSameWeek(dateLeft, dateRight, transformedOptions);
    }

    isSameDay(dateLeft: Date, dateRight: Date): boolean {
        return isSameDay(dateLeft, dateRight);
    }

    isToday(date: Date): boolean {
        return isToday(date);
    }

    parseISO(dateString: string): Date {
        return parseISO(dateString);
    }

    format(date: Date, formatString: string, options?: { locale?: any }): string {
        return format(date, formatString, options);
    }

    differenceInDays(laterDate: Date, earlierDate: Date): number {
        return differenceInDays(laterDate, earlierDate);
    }
    compareAsc(dateLeft: Date, dateRight: Date): number {
        return compareAsc(dateLeft, dateRight);
    }
    getDay(date: Date): number {
        return getDay(date);
    }
}
