import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BasketComponent } from './basket/basket.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditorGuard } from './guards/editor.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TourAdminEditComponent } from './tours-admin/tour-admin-edit/tour-admin-edit.component';
import { ToursAdminComponent } from './tours-admin/tours-admin.component';
import { TourFormComponent } from './tours/tour-form/tour-form.component';
import { TourComponent } from './tours/tour/tour.component';
import { ToursComponent } from './tours/tours.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  { path: 'newTour', component: TourFormComponent, canActivate: [AuthGuard]},
  { path: 'adminUsers', component: AdminUsersComponent, canActivate: [AdminGuard]},
  { path: 'tours', component: ToursComponent, canActivate: [AuthGuard] },
  { path: 'toursAdmin', component: ToursAdminComponent, canActivate: [EditorGuard]},
  { path: 'toursAdmin/:id', component: TourAdminEditComponent,  canActivate: [EditorGuard]},
  { path: 'tours/:id', component: TourComponent,  canActivate: [AuthGuard]}
  ,  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
