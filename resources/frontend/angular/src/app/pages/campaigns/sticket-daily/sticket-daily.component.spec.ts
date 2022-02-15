import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SticketDailyComponent } from './sticket-daily.component';

describe('SticketDailyComponent', () => {
  let component: SticketDailyComponent;
  let fixture: ComponentFixture<SticketDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SticketDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SticketDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
