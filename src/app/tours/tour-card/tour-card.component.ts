import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITour } from 'src/app/itour';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {
  @Input() tour:ITour;
  @Input() bordCol: string;
  @Output() resign = new EventEmitter<String>();
  @Output() book = new EventEmitter<String>();
  @Output() delete = new EventEmitter<String>();
  faTrashAlt = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

  resignFunc(){
    this.resign.emit(this.tour.id);
  }

  bookFunc(){
    this.book.emit(this.tour.id);
  }

  deleteFunc(){
    this.delete.emit(this.tour.id);
  }
}
