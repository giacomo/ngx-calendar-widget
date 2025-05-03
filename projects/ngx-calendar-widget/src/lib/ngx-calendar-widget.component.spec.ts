import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCalendarWidgetComponent } from './ngx-calendar-widget.component';

describe('NgxCalendarWidgetComponent', () => {
    let component: NgxCalendarWidgetComponent;
    let fixture: ComponentFixture<NgxCalendarWidgetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxCalendarWidgetComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NgxCalendarWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
