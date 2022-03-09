import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidsDetailComponent } from './mids-detail.component';

describe('MidsDetailComponent', () => {
  let component: MidsDetailComponent;
  let fixture: ComponentFixture<MidsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
