import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourAdminComponent } from './tour-admin.component';

describe('TourAdminComponent', () => {
  let component: TourAdminComponent;
  let fixture: ComponentFixture<TourAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
