import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToursService } from './services/tours.service';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { FilterNamePipe } from './common/filter-name.pipe';
import { FilterCountryUniquePipe } from './common/filter-country-unique.pipe';
import { FilterByCountryPipe } from './common/filter-by-country.pipe';
import { FilterRateMinPipe } from './common/filter-rate-min.pipe';
import { FilterRateMaxPipe } from './common/filter-rate-max.pipe';
import { FilterPriceMaxPipe } from './common/filter-price-max.pipe';
import { FilterPriceMinPipe } from './common/filter-price-min.pipe';
import { FilterDateStartPipe } from './common/filter-date-start.pipe';
import { FilterDateEndPipe } from './common/filter-date-end.pipe';

import { environment } from 'src/environments/environment';


import { TourFormComponent } from './tours/tour-form/tour-form.component';
import { TourComponent } from './tours/tour/tour.component';
import { ToursComponent } from './tours/tours.component';
import { BasketComponent } from './basket/basket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TourBasketComponent } from './basket/tour-basket/tour-basket.component';
import { TourCardComponent } from './tours/tour-card/tour-card.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilterAuthPipe } from './common/filter-auth.pipe';
import { HomeComponent } from './home/home.component';
import { ToursAdminComponent } from './tours-admin/tours-admin.component';
import { TourAdminComponent } from './tours-admin/tour-admin/tour-admin.component';
import { TourAdminEditComponent } from './tours-admin/tour-admin-edit/tour-admin-edit.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserComponent } from './admin-users/user/user.component';

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
    BasketComponent,
    NavbarComponent,
    TourBasketComponent,
    TourCardComponent,
    LoginComponent,
    FilterAuthPipe,
    HomeComponent,
    ToursAdminComponent,
    TourAdminComponent,
    TourAdminEditComponent,
    AdminUsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFireAuthModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgbModule,
    Ng5SliderModule
  ],
  providers: [
    ToursService,
    AuthService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
