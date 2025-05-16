import { Component, Inject, OnInit } from '@angular/core';
import { CalendarEventInterface } from '../../projects/ngx-calendar-widget/src/lib/interfaces/calendar-event.interface';
import { DateAdapter } from '../../projects/ngx-calendar-widget/src/lib/interfaces/date-adapter.interface';
import { DATE_ADAPTER } from '../../projects/ngx-calendar-widget/src/lib/tokens/date-adapter.token';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'ngx-calender-widget';
    date = new Date();
    events: CalendarEventInterface[] = [];

    constructor(@Inject(DATE_ADAPTER) private dateAdapter: DateAdapter) {
    }

    ngOnInit(): void {
        this.events = [
            {
                id: 1,
                title: 'Event 1',
                date: this.date.toISOString(),
                endDate: null,
            },
            {
                id: 'conference',
                title: 'Conference',
                date: this.dateAdapter.addDays(this.date, 3).toISOString(),
                endDate: this.dateAdapter.addDays(this.date, 7).toISOString(),
                color: '#55ac77',
                textColor: '#000000',
            }
        ] as CalendarEventInterface[];
    }
}
