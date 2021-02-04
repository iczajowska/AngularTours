import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ITour } from 'src/app/itour';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tour-admin',
  templateUrl: './tour-admin.component.html',
  styleUrls: ['./tour-admin.component.css']
})
export class TourAdminComponent implements OnInit {
  @Input() tour: ITour;
  @Output() delete = new EventEmitter<String>();
  faTrashAlt = faTrashAlt;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  deleteFunc(){
    this.delete.emit(this.tour.id);
  }

}
