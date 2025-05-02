import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxCalenderWidgetComponent } from './ngx-calender-widget.component';
import { CommonModule } from '@angular/common';
import { provideNgxCalenderTranslations, type Locale } from './locale.store';

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
    /**
     * Provides one or more locale translations using Angular's APP_INITIALIZER.
     * Ensures translations are registered before the application fully bootstraps.
     * @param locales A single `Locale` object or an array of `Locale` objects.
     * @see {@link Locale}
    */
    static forRoot(locales: Locale | Locale[]): ModuleWithProviders<NgxCalenderWidgetModule> {
        return {
            ngModule: NgxCalenderWidgetModule,
            providers: [
                provideNgxCalenderTranslations(locales)
            ]
        }
    }
}
