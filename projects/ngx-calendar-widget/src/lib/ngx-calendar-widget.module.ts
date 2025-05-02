import { NgModule } from '@angular/core';
import { NgxCalendarWidgetComponent } from './ngx-calendar-widget.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        NgxCalendarWidgetComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        NgxCalendarWidgetComponent
    ]
})
export class NgxCalendarWidgetModule {
}
