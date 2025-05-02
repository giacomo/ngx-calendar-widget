import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCalenderWidgetComponent } from './ngx-calender-widget.component';

describe('NgxCalenderWidgetComponent', () => {
  let component: NgxCalenderWidgetComponent;
  let fixture: ComponentFixture<NgxCalenderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxCalenderWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCalenderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
