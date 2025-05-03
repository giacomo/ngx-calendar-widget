import { TestBed } from '@angular/core/testing';

import { NgxCalendarWidgetConfigService } from './ngx-calendar-widget-config.service';

describe('NgxCalendarWidgetConfigService', () => {
  let service: NgxCalendarWidgetConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalendarWidgetConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
