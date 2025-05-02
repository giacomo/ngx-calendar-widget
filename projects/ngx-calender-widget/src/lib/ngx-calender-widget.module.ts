import { NgModule } from '@angular/core';
import { NgxCalenderWidgetComponent } from './ngx-calender-widget.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        NgxCalenderWidgetComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        NgxCalenderWidgetComponent
    ]
})
export class NgxCalenderWidgetModule {
}
