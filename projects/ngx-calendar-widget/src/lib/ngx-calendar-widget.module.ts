import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxCalendarWidgetComponent } from './ngx-calendar-widget.component';
import { CommonModule } from '@angular/common';
import { Locale, provideNgxCalendarTranslations } from './locale.store';

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
    /**
     * Provides one or more locale translations using Angular's APP_INITIALIZER.
     * Ensures translations are registered before the application fully bootstraps.
     * @param locales A single `Locale` object or an array of `Locale` objects.
     * @see {@link provideNgxCalendarTranslations}
     * @see {@link Locale}
    */
    static forRoot(locales: Locale | Locale[]): ModuleWithProviders<NgxCalendarWidgetModule> {
        return {
            ngModule: NgxCalendarWidgetModule,
            providers: [
                provideNgxCalendarTranslations(locales)
            ]
        }
    }
}
