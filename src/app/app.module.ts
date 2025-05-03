import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCalendarWidgetModule } from '../../projects/ngx-calendar-widget/src/lib/ngx-calendar-widget.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxCalendarWidgetModule.forRoot() // Using default date-fns adapter
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
