import { TestBed } from '@angular/core/testing';

import { NgxCalendarWidgetService } from './ngx-calendar-widget.service';

describe('NgxCalenderWidgetService', () => {
  let service: NgxCalendarWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalendarWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
