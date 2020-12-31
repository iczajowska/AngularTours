import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBasketComponent } from './tour-basket.component';

describe('TourBasketComponent', () => {
  let component: TourBasketComponent;
  let fixture: ComponentFixture<TourBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
