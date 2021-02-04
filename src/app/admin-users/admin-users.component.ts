import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(
      map(changes =>
      changes.map(c =>
      ({
        id: c.payload.doc.id, ...c.payload.doc.data()
       })
      ))
      ).subscribe(users => {
        this.users = users;
        this.users.forEach(u => {
          u.admin = false;
          u.editor = false;
          u.vip = false;
          for(let role of u.roles){
            if(role === 'admin'){
              u.admin = true;
            } else if(role === 'editor'){
              u.editor = true;
            } else if(role === 'VIP'){
              u.vip = true;
            }
          }
        });
      }, err => console.log(err));
  }

  

}
