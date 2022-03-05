import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidGroupsComponent } from './mid-groups.component';

describe('MidGroupsComponent', () => {
  let component: MidGroupsComponent;
  let fixture: ComponentFixture<MidGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
