import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ITour } from '../itour';
import { IUser } from '../iuser';
import { UsersService } from '../services/users.service';
import { ToursService } from './tours.service';

export class Credentials {
  email: string = '';
  password: string = '';
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersRoles = new Map<string, string[]>();
  userData: IUser;

  constructor(private afAuth: AngularFireAuth, private usersService: UsersService, private toursService: ToursService) {
    this.usersService.getUserRoles().subscribe(roles => {
      roles.forEach(userRole => {
        this.usersRoles.set(userRole.email, userRole.roles);
      });
    });

    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if ( user ){
        this.userData = user;
        if (this.usersRoles.get(user.email) == null){
          console.log('Add new user');
          usersService.addUser(user);
          usersService.setUserWithEmail(user.email);
        } else {
          usersService.setUserWithEmail(user.email);
        }

      } else{
        this.userData = null;
      }
    });
  }

  // get user(): User | null {
  //   return this.afAuth.currentUser;
  // }

  private checkAuthorization(allowedRoles: string[]): boolean{
    if (this.userData == null) { return false; }
    const roles = this.usersRoles.get(this.userData.email);
    if (roles == null) { return false; }

    for (const role of allowedRoles){
      // console.log(role);
      if (roles.includes(role)) { return true; }
    }
    return false;
  }

  isUserAdmin(): boolean {
    return this.checkAuthorization(['admin']);
  }

  canEdit(): boolean {
    return this.checkAuthorization(['admin', 'editor']);
  }

  isVIP(): boolean{
    return this.checkAuthorization(['VIP','admin','editor']);
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return this.userData != null;
  }

  // tslint:disable-next-line:typedef
  login({ email, password }: Credentials) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(() => { //this.usersService.setUserWithEmail(email);
       } );
  }

  // tslint:disable-next-line:typedef
  register({ email, password }: Credentials) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // tslint:disable-next-line:typedef
  logout() {
    return this.afAuth.signOut();
  }

  canShow(tour: ITour) : boolean {

    if( this.canEdit() ) return true;

    if( tour.dateStart > Date.now()) {
      if( this.isVIP() ) { return true; }
      else if( this.isLoggedIn() && tour.availablePlaces > 1 ){
        return true;
      }
    }
    return false;
  }

}
