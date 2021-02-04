import { Component, Input, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: any;
  admin: boolean ;
  vip: boolean ;
  editor: boolean ;
  constructor(private usersService: UsersService) {
   }

  ngOnInit(): void {
    this.admin = this.user.admin;
    this.vip = this.user.vip;
    this.editor = this.user.editor;

  }


  adminChange(){
    if( this.admin ){
      this.admin = false;
    } else{
      this.admin = true;
    }

    this.update();
  }

  editorChange(){
    if( this.editor ){
      this.editor = false;
    } else{
      this.editor = true;
    }

    this.update();
  }

  vipChange(){
    if( this.vip ){
      this.vip = false;
    } else{
      this.vip = true;
    }

    this.update();    
  }

  update(){
    let arrRoles = [];
    if( this.admin ){
      arrRoles.push("admin");
    }
    if( this.editor ){
      arrRoles.push("editor");
    }
    if( this.vip ){
      arrRoles.push("VIP");
    }

    this.usersService.updateUser(this.user.id, {roles: arrRoles});
  }

}
