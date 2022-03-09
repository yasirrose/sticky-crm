import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidViewComponent } from './mid-view.component';

describe('MidViewComponent', () => {
  let component: MidViewComponent;
  let fixture: ComponentFixture<MidViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
