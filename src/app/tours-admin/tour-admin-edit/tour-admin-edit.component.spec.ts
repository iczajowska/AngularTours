import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourAdminEditComponent } from './tour-admin-edit.component';

describe('TourAdminEditComponent', () => {
  let component: TourAdminEditComponent;
  let fixture: ComponentFixture<TourAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourAdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
