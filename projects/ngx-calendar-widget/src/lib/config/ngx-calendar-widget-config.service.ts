import { Injectable } from '@angular/core';
import { DateAdapter } from '../interfaces/date-adapter.interface';

@Injectable({
    providedIn: 'root'
})
export class NgxCalendarWidgetConfigService {
    defaultLanguage?: string = 'en';
    availableLanguages?: string[] = ['en', 'de', 'it', 'fr'];
    dateAdapter?: DateAdapter;
}
