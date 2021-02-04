import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// tslint:disable-next-line:import-spacing
import  firebase from 'firebase/app';
import { ITour } from '../itour';
import { MockTourData } from '../mock-tour-data';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  dbPath = 'tours';

  constructor(private db: AngularFirestore) {
  }

  // tslint:disable-next-line:typedef
  getTours(){
    return this.db.collection<ITour>(this.dbPath).snapshotChanges();
  }

  // tslint:disable-next-line:typedef
  getTour(tourID: string){
    return this.db.collection<ITour>(this.dbPath).doc(tourID).snapshotChanges();
  }

  // tslint:disable-next-line:typedef
  addTour(tour: ITour){
    this.db.collection(this.dbPath).add({
      name: tour.name,
      destination: tour.destination,
      country: tour.country,
      dateStart: firebase.firestore.Timestamp.fromDate(tour.dateStart),
      dateEnd: firebase.firestore.Timestamp.fromDate(tour.dateEnd),
      price: tour.price,
      description: tour.description,
      image: tour.image,
      availablePlaces: tour.availablePlaces,
      totalPlaces: tour.totalPlaces,
      rating: tour.rating,
      totalVotes: tour.totalVotes,
      inBasket: 0
    }).then(docRef => {
      console.log('Document written with ID: ', docRef.id);
    });
  }

  // tslint:disable-next-line:typedef
  deleteTour(tourID: string){
    this.db.collection<ITour>(this.dbPath).doc(tourID).delete();
  }

  // tslint:disable-next-line:typedef
  updateTour(tourID: string, value: any){
    console.log(tourID, ' ', value );
    
    // if( value.inBasket != null){
    //   console.log("hello add too basket");

    // } 
    this.db.collection<ITour>(this.dbPath).doc(tourID).update(value);
  }

  // tslint:disable-next-line:typedef
  getBookedTrips(){
    return this.db.collection<ITour>(this.dbPath, ref => ref.where('inBasket', '>', 0)).snapshotChanges();
  }

}
