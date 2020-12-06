import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToursComponent } from './tours/tours.component';
import { ToursService } from './tours.service';
import { TourComponent } from './tours/tour/tour.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TourFormComponent } from './tours/tour-form/tour-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterNamePipe } from './common/filter-name.pipe'
import { Ng5SliderModule } from 'ng5-slider';
import { FilterCountryUniquePipe } from './common/filter-country-unique.pipe';
import { FilterByCountryPipe } from './common/filter-by-country.pipe';
import { FilterRateMinPipe } from './common/filter-rate-min.pipe';
import { FilterRateMaxPipe } from './common/filter-rate-max.pipe';
import { FilterPriceMaxPipe } from './common/filter-price-max.pipe';
import { FilterPriceMinPipe } from './common/filter-price-min.pipe';
import { FilterDateStartPipe } from './common/filter-date-start.pipe';
import { FilterDateEndPipe } from './common/filter-date-end.pipe';
import { BasketComponent } from './tours/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    TourComponent,
    TourFormComponent,
    FilterNamePipe,
    FilterCountryUniquePipe,
    FilterByCountryPipe,
    FilterRateMinPipe,
    FilterRateMaxPipe,
    FilterPriceMaxPipe,
    FilterPriceMinPipe,
    FilterDateStartPipe,
    FilterDateEndPipe,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgbModule,
    Ng5SliderModule
  ],
  providers: [
    ToursService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }