import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidsComponent } from './mids.component';

describe('MidsComponent', () => {
  let component: MidsComponent;
  let fixture: ComponentFixture<MidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
