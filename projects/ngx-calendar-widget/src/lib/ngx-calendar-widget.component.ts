import { Component, Output, EventEmitter, Input, SimpleChanges, OnChanges, Inject } from '@angular/core';
import { Translations } from './translations';
import { CalendarEventInterface } from './interfaces/calendar-event.interface';
import { DateAdapter } from './interfaces/date-adapter.interface';
import { DATE_ADAPTER } from './tokens/date-adapter.token';

@Component({
    selector: 'ngx-calendar-widget',
    standalone: false,
    templateUrl: './ngx-calendar-widget.component.html',
    styleUrl: './ngx-calendar-widget.component.scss'
})
export class NgxCalendarWidgetComponent implements OnChanges {
    @Input() locale: 'en' | 'es' | 'de' | 'fr' | 'it' = 'de';
    @Input() size: 'default' | 'large' | 'x-large' = 'default';
    @Input() hideMultiDayEventsText: boolean = true;
    @Input() enableAddEvent: boolean = false;
    @Input() events: CalendarEventInterface[] = [];

    month = 0;
    year = 0;
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

    constructor(@Inject(DATE_ADAPTER) private dateAdapter: DateAdapter) {
        this.month = this.dateAdapter.getMonth(new Date());
        this.year = this.dateAdapter.getYear(new Date());
        this.updateLocaleSpecificData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['locale'] && this.locale !== changes['locale'].previousValue) {
            this.updateLocaleSpecificData();
        }
    }

    private updateLocaleSpecificData(): void {
        this.months = Translations.getMonthNames(this.locale);
        this.weekdays = Translations.getDayNames(this.locale);
        this.today = Translations.getToday(this.locale);
        this.localeCode = Translations.getLocale(this.locale);
        this.addEventText = Translations.getAddEvent(this.locale);
        this.endDateText = Translations.getEndDate(this.locale);
    }

    get matrix() {
        const matrix: any[] = [];
        const date = new Date(this.year, this.month);
        let currentDate = this.dateAdapter.startOfWeek(date, { weekStartsOn: this.weekStartsOn })

        this.rows.forEach(row => {
            const week: any[] = []
            this.cols.forEach(col => {
                week.push(currentDate)
                currentDate = this.dateAdapter.addDays(currentDate, 1)
            });

            matrix.push(week)
        });

        return matrix
    }

    goToToday() {
        const today = new Date();
        this.month = this.dateAdapter.getMonth(today);
        this.year = this.dateAdapter.getYear(today);
    }

    nextMonth() {
        const date = this.dateAdapter.addMonths(new Date(this.year, this.month), 1);

        this.month = this.dateAdapter.getMonth(date);
        this.year = this.dateAdapter.getYear(date);
    }

    prevMonth() {
        const date = this.dateAdapter.addMonths(new Date(this.year, this.month), -1);

        this.month = this.dateAdapter.getMonth(date);
        this.year = this.dateAdapter.getYear(date);
    }

    isNotSameMonth(date: Date) {
        return !this.dateAdapter.isSameMonth(date, new Date(this.year, this.month));
    }

    isWeekend(date: Date) {
        return this.dateAdapter.isWeekend(date);
    }

    isToday(date: Date) {
        return this.dateAdapter.isToday(date);
    }

    isSelected(date: Date) {
        return (this.startDate && this.dateAdapter.isSameDay(date, this.dateAdapter.parseISO(this.startDate))) ||
            (this.endDate && this.dateAdapter.isSameDay(date, this.dateAdapter.parseISO(this.endDate)));
    }

    getEventsForDay(date: Date) {
        // Group and track events to determine positions
        if (this.dateAdapter.isSameDay(date, this.dateAdapter.startOfWeek(date, { weekStartsOn: this.weekStartsOn }))) {
            // Process events for the entire week when we're on the first day of the week
            this.processEventsForWeek();
        }

        // Get events for this day
        return this.processedEvents.filter(event => {
            return event.days.some((day: Date) => this.dateAdapter.isSameDay(day, date));
        }).map(event => {
            const isFirstDay = this.dateAdapter.isSameDay(date, this.dateAdapter.parseISO(event.date));
            const isLastDay = event.endDate ? this.dateAdapter.isSameDay(date, this.dateAdapter.parseISO(event.endDate)) : true;
            const dayIndex = event.days.findIndex((day: Date) => this.dateAdapter.isSameDay(day, date));

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
                const dateA = this.dateAdapter.parseISO(a.date);
                const dateB = this.dateAdapter.parseISO(b.date);
                const durationA = a.endDate ?
                    this.dateAdapter.differenceInDays(this.dateAdapter.parseISO(a.endDate), dateA) + 1 : 1;
                const durationB = b.endDate ?
                    this.dateAdapter.differenceInDays(this.dateAdapter.parseISO(b.endDate), dateB) + 1 : 1;

                // Sort by duration (longer events first), then by start date
                if (durationA !== durationB) {
                    return durationB - durationA;
                }
                return this.dateAdapter.compareAsc(dateA, dateB);
            });

        // Process each event
        for (const event of sortedEvents) {
            const startDate = this.dateAdapter.parseISO(event.date);
            const endDate = event.endDate ? this.dateAdapter.parseISO(event.endDate) : startDate;
            const days: Date[] = [];

            let currentDate = startDate;
            while (this.dateAdapter.compareAsc(currentDate, endDate) <= 0) {
                days.push(currentDate);
                currentDate = this.dateAdapter.addDays(currentDate, 1);
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
                            event.days.some((eventDay: Date) => this.dateAdapter.isSameDay(day, eventDay))
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
        const dayOfWeek = this.dateAdapter.getDay(date);
        return dayOfWeek === this.weekStartsOn;
    }

    hasEventStartInCurrentWeek(event: any, currentDate: Date) {
        // Checks if the beginning of the event is in the same week as the current date
        return this.dateAdapter.isSameWeek(
            this.dateAdapter.parseISO(event.date),
            currentDate,
            { weekStartsOn: this.weekStartsOn }
        );
    }

    getDisplayTitle(event: any, isFirstDay: boolean, isLastDay: boolean): string {
        if (!event.endDate) {
            return `${event.title}`;
        }

        if (isFirstDay && isLastDay) {
            return `${this.dateAdapter.format(this.dateAdapter.parseISO(event.date), 'HH:mm', {locale: this.localeCode })} - ${this.dateAdapter.format(this.dateAdapter.parseISO(event.endDate), 'HH:mm', {locale: this.localeCode })} ${event.title} `;
        } else if (isFirstDay) {
            return `${event.title} (${this.dateAdapter.format(this.dateAdapter.parseISO(event.date), 'MMM d', {locale: this.localeCode })} - ${this.dateAdapter.format(this.dateAdapter.parseISO(event.endDate), 'MMM d', {locale: this.localeCode })})`;
        } else if (isLastDay) {
            return `${event.title} (${this.endDateText} ${this.dateAdapter.format(this.dateAdapter.parseISO(event.endDate), 'MMM d', {locale: this.localeCode })})`;
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
                    event.isFirstDay || // Always visible at the start of the event
                    this.isFirstDayOfWeek(date) || // Always visible on the first day of each week
                    (event.isLastDay && !this.isFirstDayOfWeek(date)) // Last day visible if not also the first day of the week
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

    onEventSelect(event: any, $event: Event) {
        $event.stopPropagation();
        this.selectEvent.emit(event);
    }
}
