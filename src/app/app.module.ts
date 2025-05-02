import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCalenderWidgetModule } from '../../projects/ngx-calender-widget/src/lib/ngx-calender-widget.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxCalenderWidgetModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
