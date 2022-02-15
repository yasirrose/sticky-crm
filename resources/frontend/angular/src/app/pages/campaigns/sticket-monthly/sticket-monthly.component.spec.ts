import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SticketMonthlyComponent } from './sticket-monthly.component';

describe('SticketMonthlyComponent', () => {
  let component: SticketMonthlyComponent;
  let fixture: ComponentFixture<SticketMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SticketMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SticketMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
