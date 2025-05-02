import { Component, Output, EventEmitter, Input, SimpleChanges, OnChanges, inject, untracked } from '@angular/core';
import {
    getMonth,
    getYear,
    startOfWeek,
    addDays,
    addMonths,
    isSameMonth,
    isWeekend,
    isSameDay,
    isToday as isTodayFn,
    format,
    parseISO,
    differenceInDays,
    compareAsc,
    isSameWeek, getDay
} from 'date-fns';
import { CalenderEventInterface } from './calender-event.interface';
import { LocaleStore } from './locale.store';

@Component({
    selector: 'ngx-calender-widget',
    standalone: false,
    templateUrl: './ngx-calender-widget.component.html',
    styleUrl: './ngx-calender-widget.component.scss'
})
export class NgxCalenderWidgetComponent implements OnChanges {
    private readonly locales = inject(LocaleStore);
    @Input() locale: string = 'en';
    @Input() size: 'default' | 'large' | 'x-large' = 'default';
    @Input() hideMultiDayEventsText: boolean = true;
    @Input() enableAddEvent: boolean = false;
    @Input() events: CalenderEventInterface[] = [];

    month = getMonth(new Date());
    year = getYear(new Date());
    months: string[] = [];
    weekdays: string[] = [];
    today: string = '';
    localeCode: any;
    addEventText: string = '';
    endDateText: string = '';
    private weekStartsOn: any = 1;
    private rows = [...Array(6).keys()];
    private cols = [...Array(7).keys()];
    private startDate: string | null = null;
    private endDate: string | null = null;

    @Output() addEvent = new EventEmitter<string>();
    @Output() selectEvent = new EventEmitter<any>();

    private processedEvents: any[] = [];

    constructor() {
        this.updateLocaleSpecificData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['locale'] && this.locale !== changes['locale'].previousValue) {
            this.updateLocaleSpecificData();
        }
    }

    private updateLocaleSpecificData(): void {
        const t = untracked(this.locales.getTranslation(this.locale));

        this.localeCode = t.name;
        this.today = t.today;
        this.weekdays = t.dayNames;
        this.months = t.monthNames;
        this.addEventText = t.addEvent;
        this.endDateText = t.endDate;
    }
    get matrix() {
        const matrix: any[] = [];
        const date = new Date(this.year, this.month);
        let currentDate = startOfWeek(date, { weekStartsOn: this.weekStartsOn })

        this.rows.forEach(row => {
            const week: any[] = []
            this.cols.forEach(col => {
                week.push(currentDate)
                currentDate = addDays(currentDate, 1)
            });

            matrix.push(week)
        });

        return matrix
    }

    goToToday() {
        const today = new Date();
        this.month = getMonth(today);
        this.year = getYear(today);
    }

    nextMonth() {
        const date = addMonths(new Date(this.year, this.month), 1);

        this.month = getMonth(date);
        this.year = getYear(date);
    }

    prevMonth() {
        const date = addMonths(new Date(this.year, this.month), -1);

        this.month = getMonth(date);
        this.year = getYear(date);
    }

    isNotSameMonth(date: Date) {
        return !isSameMonth(date, new Date(this.year, this.month));
    }

    isWeekend(date: Date) {
        return isWeekend(date);
    }

    isToday(date: Date) {
        return isTodayFn(date);
    }

    isSelected(date: Date) {
        return (this.startDate && isSameDay(date, parseISO(this.startDate))) ||
            (this.endDate && isSameDay(date, parseISO(this.endDate)));
    }

    getEventsForDay(date: Date) {
        // Group and track events to determine positions
        if (isSameDay(date, startOfWeek(date, { weekStartsOn: this.weekStartsOn }))) {
            // Process events for the entire week when we're on the first day of the week
            this.processEventsForWeek();
        }

        // Get events for this day
        return this.processedEvents.filter(event => {
            return event.days.some((day: Date) => isSameDay(day, date));
        }).map(event => {
            const isFirstDay = isSameDay(date, parseISO(event.date));
            const isLastDay = event.endDate ? isSameDay(date, parseISO(event.endDate)) : true;
            const dayIndex = event.days.findIndex((day: Date) => isSameDay(day, date));

            return {
                ...event,
                isFirstDay,
                isLastDay,
                isMultiDay: !!event.endDate,
                dayIndex,
                displayTitle: this.getDisplayTitle(event, isFirstDay, isLastDay)
            };
        });
    }

    private processEventsForWeek() {
        // Reset processed events
        this.processedEvents = [];

        // Clone and sort events by start date and duration
        const sortedEvents = [...this.events]
            .sort((a, b) => {
                const dateA = parseISO(a.date);
                const dateB = parseISO(b.date);
                const durationA = a.endDate ?
                    differenceInDays(parseISO(a.endDate), dateA) + 1 : 1;
                const durationB = b.endDate ?
                    differenceInDays(parseISO(b.endDate), dateB) + 1 : 1;

                // Sort by duration (longer events first), then by start date
                if (durationA !== durationB) {
                    return durationB - durationA;
                }
                return compareAsc(dateA, dateB);
            });

        // Process each event
        for (const event of sortedEvents) {
            const startDate = parseISO(event.date);
            const endDate = event.endDate ? parseISO(event.endDate) : startDate;
            const days: Date[] = [];

            let currentDate = startDate;
            while (compareAsc(currentDate, endDate) <= 0) {
                days.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }

            // Find position for the event (track)
            let track = 0;
            let positionFound = false;

            while (!positionFound) {
                positionFound = true;

                // Check if this track is available for all days of this event
                for (const event of this.processedEvents) {
                    if (event.track === track) {
                        // Check for overlap
                        const overlap = days.some(day =>
                            event.days.some((eventDay: Date) => isSameDay(day, eventDay))
                        );

                        if (overlap) {
                            positionFound = false;
                            track++;
                            break;
                        }
                    }
                }
            }

            this.processedEvents.push({
                ...event,
                days,
                track
            });
        }
    }

    isFirstDayOfWeek(date: Date) {
        const dayOfWeek = getDay(date);
        return dayOfWeek === this.weekStartsOn;
    }

    hasEventStartInCurrentWeek(event: any, currentDate: Date) {
        // Prüft, ob der Beginn des Events in der gleichen Woche wie das aktuelle Datum liegt
        return isSameWeek(
            parseISO(event.date),
            currentDate,
            { weekStartsOn: this.weekStartsOn }
        );
    }

    getDisplayTitle(event: any, isFirstDay: boolean, isLastDay: boolean): string {
        if (!event.endDate) {
            return `${event.title}`;
        }

        if (isFirstDay && isLastDay) {
            return `${format(parseISO(event.date), 'HH:mm', {locale: this.localeCode })} - ${format(parseISO(event.endDate), 'HH:mm', {locale: this.localeCode })} ${event.title} `;
        } else if (isFirstDay) {
            return `${event.title} (${format(parseISO(event.date), 'MMM d', {locale: this.localeCode })} - ${format(parseISO(event.endDate), 'MMM d', {locale: this.localeCode })})`;
        } else if (isLastDay) {
            return `${event.title} (${this.endDateText} ${format(parseISO(event.endDate), 'MMM d', {locale: this.localeCode })})`;
        } else {
            return `${event.title}`;
        }
    }

    getEventClass(event: any, date: Date) {
        return {
            'calender__event--first': event.isFirstDay,
            'calender__event--last': event.isLastDay,
            'calender__event--middle': event.isMultiDay && !event.isFirstDay && !event.isLastDay,
            'calender__event--multi-day-hidden': event.isMultiDay && this.hideMultiDayEventsText &&
                !(
                    event.isFirstDay || // Start des Events immer sichtbar
                    this.isFirstDayOfWeek(date) || // Erster Tag jeder Woche immer sichtbar
                    (event.isLastDay && !this.isFirstDayOfWeek(date)) // Letzter Tag sichtbar, wenn nicht auch erster Tag der Woche
                ),
            'calender__event--multi-day': event.isMultiDay
        };
    }

    getEventStyles(event: any) {
        return {
            'order': event.track,
            'z-index': 10 - event.track // Higher tracks should be behind
        };
    }

    addNewEvent(date: Date, $event: MouseEvent) {
        // Stop event propagation to prevent day selection when clicking the plus icon
        $event.stopPropagation();
        this.addEvent.emit(date.toISOString());
    }

    get calendarSizeClass(): string {
        if (this.size === 'large') {
            return 'calender--large';
        } else if (this.size === 'x-large') {
            return 'calender--x-large';
        }
        return '';
    }

    onEventClick(event: any, $event: MouseEvent) {
        $event.stopPropagation();
        this.selectEvent.emit(event);
    }
}
