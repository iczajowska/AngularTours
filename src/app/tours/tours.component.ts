import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { ToursService } from '../tours.service';

import { FormGroup, FormBuilder }  from '@angular/forms';
import { ITour } from '../itour';
import { Options } from "ng5-slider";


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

  searchText = "";
  value: number= 0;
  highValue: number;
  options: Options;
  value2: number = 0;
  highValue2: number = 5;
  options2: Options = {
    floor: 0,
    ceil: 5
  };
  value3: number;
  highValue3: number;
  options3: Options;


  constructor(private service: ToursService,private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tours =  this.service.getTours(); 
    this.priceMinMaxID();
    this.findMaxID();
    this.setOptions();
  }

  onResignFun(tourID: Number){
    console.log("resign",tourID);

    var foundIndex  = this.tours.findIndex(x => x.id === tourID);
    this.tours[foundIndex].availablePlaces += 1;
    this.tours = Object.create(this.tours);
    this.changeDetection.detectChanges();
  }

  onBookFun(tourID: Number){
    console.log("booked",tourID);

    var foundIndex  = this.tours.findIndex(x => x.id === tourID);
    this.tours[foundIndex].availablePlaces -= 1;
    this.tours = Object.create(this.tours);
    this.changeDetection.detectChanges();
  }

  onDeleteFun(tourID: Number){
    console.log("Delete",tourID);
    var foundIndex  = this.tours.findIndex(x => x.id === tourID);

    if(foundIndex>-1){
      this.tours.splice(foundIndex, 1);
    }

    if(this.tours.length !== 0){
      this.priceMinMaxID();
      this.findMaxID();
    }

    this.tours = Object.create(this.tours);
    this.changeDetection.detectChanges();

  }
  onSubmitFun(tourNew: ITour){
    this.tours.push(tourNew);
    this.changeDetection.detectChanges();
    this.tours = Object.create(this.tours);

    console.log(this.tours);
    this.changeDetection.detectChanges();
    this.priceMinMaxID();
    this.findMaxID();
    this.setOptions();
    this.changeDetection.detectChanges();
  }

  priceMinMaxID(){
    this.maxPriceTourID = this.tours.reduce(function(prev, current) {
      return +current.price > +prev.price ? current : prev;
    }).id;
    this.minPriceTourID = this.tours.reduce(function(prev, current) {
      return +current.price < +prev.price ? current : prev;
    }).id;
  }

  setOptions(){
    this.highValue = this.tours.find(x => x.id === this.maxPriceTourID).price;
    this.value =  this.tours.find(x => x.id === this.minPriceTourID).price;

    this.options = {
      floor:this.tours.find(x => x.id === this.minPriceTourID).price,
      ceil: this.tours.find(x => x.id === this.maxPriceTourID).price
    }

    this.value3 = this.tours.reduce(function(prev, current) {
      return +current.dateStart < +prev.dateStart ? current : prev;
    }).dateStart.getTime();
    this.highValue3 = this.tours.reduce(function(prev, current) {
      return +current.dateEnd > +prev.dateEnd ? current : prev;
    }).dateEnd.getTime();


    this.options3 =  {
      floor: this.value3,
      ceil: this.highValue3,
      translate:(value: number): string => {
        return new Date(value).toDateString();
      }
    };
  }

  findMaxID(){
    this.maxID = this.tours.reduce(function(prev, current) {
      return +current.id > +prev.id ? current : prev;
    }).id +1;
  }
}
