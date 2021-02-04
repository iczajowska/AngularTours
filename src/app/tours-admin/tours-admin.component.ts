import { Component, OnInit } from '@angular/core';
import { ToursService } from '../services/tours.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tours-admin',
  templateUrl: './tours-admin.component.html',
  styleUrls: ['./tours-admin.component.css']
})
export class ToursAdminComponent implements OnInit {
  tours;

  constructor(private toursService: ToursService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.toursService.getTours().pipe(
      map(changes =>
      changes.map(c =>
      ({
        id: c.payload.doc.id, ...c.payload.doc.data()
       })
      ))
      ).subscribe(tours => {
        this.tours = tours;
        this.tours.forEach(t => {t.dateStart = t.dateStart.toDate(); t.dateEnd = t.dateEnd.toDate(); });

      }, err => console.log(err));
  }

  addTour(){
    this.router.navigate(['/newTour']);
  }

  showUsers(){
    this.router.navigate(['/adminUsers']);
  }

  onDeleteFun(tourID: string){
    this.toursService.deleteTour(tourID);
  }

}
