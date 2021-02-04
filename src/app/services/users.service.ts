import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {ITour} from '../itour';
import firebase from 'firebase';
import {IUser} from '../iuser';
import { ToursService } from './tours.service';
import { map } from 'rxjs/operators';

export class UserRole {
  email: string;
  roles: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/users';
  userData: any;
  user: any = null;

  constructor(private db: AngularFirestore, private toursService: ToursService) {
  }

  // tslint:disable-next-line:typedef
  getUserRoles() {
    return this.db.collection<UserRole>(this.dbPath).valueChanges({ idField: 'key' });
  }

  // tslint:disable-next-line:typedef
  addUser(user: IUser){
    this.db.collection(this.dbPath).add({
      email: user.email,
      uid: user.uid,
      roles: [],
      trips: [],
      tripsInBasket: []
    }).then(docRef => {
      console.log('Document written with ID: ', docRef.id);
    });
  }

  // tslint:disable-next-line:typedef
  setUserWithEmail(email: string){
    this.userData = this.db.collection(this.dbPath, ref => ref.where('email', '==', email)).valueChanges();
    this.userData.subscribe(users => {
      this.user = users[0];
      console.log('user:' , this.user.email , this.user.roles, this.user.trips, this.user.id);
      //this.setInBasket();
    });
  }
  // tslint:disable-next-line:typedef
  getUser(){
    return this.user;
  }

  getUsers(){
    return this.db.collection<any>(this.dbPath).snapshotChanges();
  }

  getUserBasket(){
    return this.user.tripsInBasket;
  }

  updateUser(userID: string, value: any){
    console.log(userID, ' ', value );
    this.db.collection<any>(this.dbPath).doc(userID).update(value);
  }

  // setInBasket(){
  //   console.log("set basket hello");
  //   let basket = this.getUserBasket();
  //   var basketIDs = basket.map(t => t.tourID);
  //   var toursIDs;
  //   this.toursService.getTours().pipe(
  //     map(changes =>
  //     changes.map(c =>
  //     ({
  //       id: c.payload.doc.id, ...c.payload.doc.data()
  //      })
  //     ))
  //     ).subscribe(tours => {
  //       toursIDs = tours.map(t => t.id);
  //       // for(var i = 0; i < toursIDs.length; i++){
  //       //   console.log(toursIDs[i]);
  //       //   this.toursService.updateTour(toursIDs[i], {inBasket: 0});
  //       // }
  //       // basket.forEach(t => this.toursService.updateTour(t.tourID, {inBasket: t.booked}));
  //     }, err => console.log(err));
  // }

}
