import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Credentials } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = new Credentials();
  errorInfo = '';
  alertVisible = false;

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login(this.credentials)
    .then(() => { console.log('Login'); this.router.navigate(['/home']); })
    .catch(err => { this.errorInfo = err.message; this.showAlert(); });
  }

  // tslint:disable-next-line:typedef
  register() {
    this.authService.register(this.credentials)
    .then(() => { console.log('Register'); this.router.navigate(['/login']); })
    .catch(err => {this.errorInfo = err.message; this.showAlert(); });
  }

  // tslint:disable-next-line:typedef
  showAlert() {
    this.alertVisible = true;
  }

  // tslint:disable-next-line:typedef
  hideAlert() {
    this.alertVisible = false;
  }

}
