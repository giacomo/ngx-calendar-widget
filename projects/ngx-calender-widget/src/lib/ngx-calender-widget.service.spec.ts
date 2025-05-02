import { TestBed } from '@angular/core/testing';

import { NgxCalenderWidgetService } from './ngx-calender-widget.service';

describe('NgxCalenderWidgetService', () => {
  let service: NgxCalenderWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalenderWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
