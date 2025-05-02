import { Component } from '@angular/core';
import { CalenderEventInterface } from '../../projects/ngx-calender-widget/src/lib/calender-event.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'ngx-calender-widget';
    date = new Date();

    events = [
        {
            id: 1,
            title: 'Event 1',
            date: this.date.toISOString(),
            endDate: null,
        }
    ] as CalenderEventInterface[];
}
