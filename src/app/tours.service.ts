import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase/app';
import { ITour } from './itour';
import { MockTourData } from './mock-tour-data'

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  dbPath = 'tours'

  constructor(private db:AngularFirestore) { 
  }

  getTours(){
    return this.db.collection<ITour>(this.dbPath).snapshotChanges();
  }
  
  getTour(tourID: string){
    return this.db.collection<ITour>(this.dbPath).doc(tourID).snapshotChanges();
  }

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
      console.log("Document written with ID: ", docRef.id);
    });
  }

  deleteTour(tourID: string){
    this.db.collection<ITour>(this.dbPath).doc(tourID).delete();
  }

  updateTour(tourID: string, value: any){
    console.log(tourID," ",value )
    this.db.collection<ITour>(this.dbPath).doc(tourID).update(value);
  }

  getBookedTrips(){
    return this.db.collection<ITour>(this.dbPath, ref => ref.where('inBasket', '>', 0)).snapshotChanges();
  }

}
