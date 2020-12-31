import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { TourFormComponent } from './tours/tour-form/tour-form.component';
import { TourComponent } from './tours/tour/tour.component';
import { ToursComponent } from './tours/tours.component';

const routes: Routes = [

  { path: 'basket', component: BasketComponent},
  { path: 'newTour', component: TourFormComponent},
  { path: 'tours', component: ToursComponent},
  { path: 'tours/:id', component: TourComponent},
  { path: '**', component: ToursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
