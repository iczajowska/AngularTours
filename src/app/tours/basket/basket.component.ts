import { Component, OnInit, Input, OnChanges ,SimpleChanges } from '@angular/core';
import { ITour } from 'src/app/itour';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnChanges {
  @Input() toursBooked: ITour[];

  bookedTrips: number =0 ;
  sumTotal: number = 0;
  faShoppingCart = faShoppingCart;

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("Basket changes");

    //better for many inputs
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'toursBooked': {
            this.basketChanges(this.toursBooked);
          }
        }
      }
    }
  }

  basketChanges(newTours: ITour[]){
    if(newTours.length !==0){
      this.bookedTrips = newTours.map(t => t.totalPlaces - t.availablePlaces).reduce(function(a, b) {
        return a + b;
      });
      this.sumTotal = newTours.map(t => (t.totalPlaces - t.availablePlaces)*t.price).reduce(function(a, b) {
        return a + b;
      });
    }else{
      this.bookedTrips = 0;
      this.sumTotal = 0;
    }
  }

}
