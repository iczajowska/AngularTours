import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToursService } from 'src/app/services/tours.service';
import { map } from 'rxjs/operators';
import { ITour } from '../../itour';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent  {
  tour: ITour;
  tourID: string;

  faTrashAlt = faTrashAlt;
  userVote = 0;
  currentRating;
  currentVotes;

  constructor(config: NgbRatingConfig, private route: ActivatedRoute, 
    private toursService: ToursService, public authService: AuthService) {
    config.max = 5;
    config.readonly = false;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.tourID = this.route.snapshot.paramMap.get('id');
    console.log(this.tourID);

    this.toursService.getTour(this.tourID).pipe(
      map(c =>
      ({
        id: c.payload.id, ...c.payload.data()
       })
      )
      ).subscribe(t => {
        t.dateStart = t.dateStart.toDate();
        t.dateEnd = t.dateEnd.toDate();
        this.tour = t;
        this.currentRating = this.tour.rating;
        this.currentVotes = this.tour.totalVotes;
      }, err => console.log(err));

  }

  // tslint:disable-next-line:typedef
  resignFunc(){
    // this.resign.emit(this.tour.id);
    if (this.tour.inBasket > 0){
      this.toursService.updateTour(this.tourID, {
        availablePlaces: this.tour.availablePlaces + 1,
        inBasket: this.tour.inBasket - 1
      });
    }else{
      alert('You have not booked choosen tour!');
    }
  }

  // tslint:disable-next-line:typedef
  bookFunc(){
    // this.book.emit(this.tour.id);
    this.toursService.updateTour(this.tourID, {
      availablePlaces: this.tour.availablePlaces - 1,
      inBasket: this.tour.inBasket + 1
    });
  }


  // tslint:disable-next-line:typedef
  somethingChanged(num){

    console.log(num);

    this.tour.rating = (this.currentRating * this.currentVotes + num) / (this.currentVotes + 1);
    this.tour.totalVotes = this.currentVotes + 1;

    this.toursService.updateTour(this.tourID,
      {
        rating: this.tour.rating,
        totalVotes: this.tour.totalVotes
      }
    );
  }

}
