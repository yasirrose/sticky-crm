import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SticketWeeklyComponent } from './sticket-weekly.component';

describe('SticketWeeklyComponent', () => {
  let component: SticketWeeklyComponent;
  let fixture: ComponentFixture<SticketWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SticketWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SticketWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
