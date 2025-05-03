import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxCalendarWidgetComponent } from './ngx-calendar-widget.component';
import { CommonModule } from '@angular/common';
import { NgxCalendarWidgetConfigService } from './config/ngx-calendar-widget-config.service';
import { DATE_ADAPTER } from './tokens/date-adapter.token';
import { DateFnsDateAdapter } from './adapter/date-fns-date.adapter';

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
    static forRoot(config: NgxCalendarWidgetConfigService = {}): ModuleWithProviders<NgxCalendarWidgetModule> {
        return {
            ngModule: NgxCalendarWidgetModule,
            providers: [
                {
                    provide: NgxCalendarWidgetConfigService,
                    useFactory: () => {
                        const defaultConfig = new NgxCalendarWidgetConfigService();
                        return Object.assign(defaultConfig, config);
                    }
                },
                {
                    provide: DATE_ADAPTER,
                    useFactory: (config: NgxCalendarWidgetConfigService) => {
                        return config.dateAdapter || new DateFnsDateAdapter();
                    },
                    deps: [NgxCalendarWidgetConfigService]
                }
            ]
        };
    }
}
