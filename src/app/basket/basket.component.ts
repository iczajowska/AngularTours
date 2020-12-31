import { Component, OnInit, Input, OnChanges ,SimpleChanges } from '@angular/core';
import { ITour } from 'src/app/itour';
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import { ToursService } from '../tours.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  toursBooked: ITour[];

  bookedTrips: number =0;
  sumTotal: number = 0;
  faShoppingBasket = faShoppingBasket;

  constructor(private toursService:ToursService) {
  }

  ngOnInit():void{
    this.toursService.getBookedTrips().pipe(
      map(changes =>
      changes.map(c =>
      ({​​ 
        id: c.payload.doc.id, ...c.payload.doc.data()  
       }​​)
      ))
      ).subscribe(tours => {
        ​​this.toursBooked = tours; 
        this.basketChanges(tours);
      },err=>console.log(err)​​); 
  }

  basketChanges(newTours: ITour[]){
    if(newTours.length !==0){
      this.bookedTrips = newTours.map(t => t.inBasket).reduce(function(a, b) {
        return a + b;
      });
      this.sumTotal = newTours.map(t => (t.inBasket)*t.price).reduce(function(a, b) {
        return a + b;
      });
    }else{
      this.bookedTrips = 0;
      this.sumTotal = 0;
    }
  }

  onResignFun(tourID: string){
    console.log("resign",tourID);

    var foundIndex  = this.toursBooked.findIndex(x => x.id === tourID);
    
    if(this.toursBooked[foundIndex].inBasket>0){
      this.toursService.updateTour(tourID, {
        availablePlaces: this.toursBooked[foundIndex].availablePlaces + 1,
        inBasket: this.toursBooked[foundIndex].inBasket - 1
      });

    }
    else{
      alert("You have not booked choosen tour!")
    }
  }

  onBookFun(tourID: string){
    console.log("booked",tourID);

    var foundIndex  = this.toursBooked.findIndex(x => x.id === tourID);

    this.toursService.updateTour(tourID, {
      availablePlaces: this.toursBooked[foundIndex].availablePlaces - 1,
      inBasket: this.toursBooked[foundIndex].inBasket + 1
    });
  }

}
