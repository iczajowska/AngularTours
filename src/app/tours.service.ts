import { Injectable } from '@angular/core';
import { ITour } from './itour';
import { MockTourData } from './mock-tour-data'

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  tours: ITour[] = []

  constructor() { }

  fetchTours(){
    Promise.resolve(MockTourData).then(
      t => {
        console.log(t);
      }
    );
  }

  getTours(){

    return MockTourData;
    //Promise.resolve(MockTourData);
  }
}
