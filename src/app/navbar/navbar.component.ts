import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faPlaneDeparture = faPlaneDeparture;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.authService.logout()
    .then(() => { console.log('Log Out'); this.router.navigate(['/login']);})
    .catch(err => console.log(err.message));
  }

}
