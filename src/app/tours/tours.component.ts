import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { ToursService } from '../services/tours.service';
import { map } from 'rxjs/operators';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ITour } from '../itour';
import { Options } from 'ng5-slider';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  tours;
  maxPriceTourID;
  minPriceTourID;

  maxID;
  selectCountry;
  arrayDateStart;
  arrayDateEnd;

  searchText = '';
  value: number= 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
  };
  value2: number = 0;
  highValue2: number = 5;
  options2: Options = {
    floor: 0,
    ceil: 5
  };
  value3: number = 0;
  highValue3: number = 0;
  options3: Options = {
    floor: 0,
    ceil: 0,
  };


  constructor(private toursService: ToursService, private changeDetection: ChangeDetectorRef,
    public authService: AuthService) {
  }

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

        this.priceMinMaxID();
        this.setOptions();
      }, err => console.log(err));
  }

  // tslint:disable-next-line:typedef
  onResignFun(tourID: string){
    console.log('resign', tourID);

    // tslint:disable-next-line:prefer-const
    let foundIndex  = this.tours.findIndex(x => x.id === tourID);

    if (this.tours[foundIndex].inBasket > 0){
      this.toursService.updateTour(tourID, {
        availablePlaces: this.tours[foundIndex].availablePlaces + 1,
        inBasket: this.tours[foundIndex].inBasket - 1
      });

    }
    else{
      alert('You have not booked chosen tour!');
    }
  }

  // tslint:disable-next-line:typedef
  onBookFun(tourID: string){
    console.log('booked', tourID);

    // tslint:disable-next-line:prefer-const
    let foundIndex  = this.tours.findIndex(x => x.id === tourID);

    this.toursService.updateTour(tourID, {
      availablePlaces: this.tours[foundIndex].availablePlaces - 1,
      inBasket: this.tours[foundIndex].inBasket + 1
    });
  }

  // tslint:disable-next-line:typedef
  onDeleteFun(tourID: string){
    this.toursService.deleteTour(tourID);
  }

  // tslint:disable-next-line:typedef
  priceMinMaxID(){
    // tslint:disable-next-line:only-arrow-functions typedef
    this.maxPriceTourID = this.tours.reduce(function(prev, current) {
      return +current.price > +prev.price ? current : prev;
    }).id;
    // tslint:disable-next-line:only-arrow-functions typedef
    this.minPriceTourID = this.tours.reduce(function(prev, current) {
      return +current.price < +prev.price ? current : prev;
    }).id;
  }

  // tslint:disable-next-line:typedef
  setOptions(){
    this.highValue = this.tours.find(x => x.id === this.maxPriceTourID).price;
    this.value =  this.tours.find(x => x.id === this.minPriceTourID).price;


    this.options = {
      floor: this.tours.find(x => x.id === this.minPriceTourID).price,
      ceil: this.tours.find(x => x.id === this.maxPriceTourID).price
    };

    // tslint:disable-next-line:only-arrow-functions typedef
    this.value3 = this.tours.reduce(function(prev, current) {
      return +current.dateStart < +prev.dateStart  ? current : prev;
    }).dateStart.getTime();
    // tslint:disable-next-line:only-arrow-functions typedef
    this.highValue3 = this.tours.reduce(function(prev, current) {
      return +current.dateEnd > +prev.dateEnd ? current : prev;
    }).dateEnd.getTime();


    this.options3 =  {
      floor: this.value3,
      ceil: this.highValue3,
      translate: (value: number): string => {
        return new Date(value).toDateString();
      }
    };
    this.options2 = {
      floor: 0,
      ceil: 5
    };
  }

}
