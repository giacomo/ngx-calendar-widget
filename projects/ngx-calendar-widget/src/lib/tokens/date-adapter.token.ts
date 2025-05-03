import { InjectionToken } from '@angular/core';
import { DateAdapter } from '../interfaces/date-adapter.interface';

export const DATE_ADAPTER = new InjectionToken<DateAdapter>('date-adapter');
