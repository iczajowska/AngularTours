import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { ITour } from 'src/app/itour';

@Component({
  selector: 'app-tour-basket',
  templateUrl: './tour-basket.component.html',
  styleUrls: ['./tour-basket.component.css']
})
export class TourBasketComponent implements OnInit {

  @Input() tour: ITour;
  @Output() resign = new EventEmitter<String>();
  @Output() book = new EventEmitter<String>();
  @Output() delete = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
    this.tour.dateEnd = this.tour.dateEnd.toDate();
    this.tour.dateStart = this.tour.dateStart.toDate();
  }

  // tslint:disable-next-line:typedef
  resignFunc(){
    this.resign.emit(this.tour.id);
  }

  // tslint:disable-next-line:typedef
  bookFunc(){
    this.book.emit(this.tour.id);
  }

  // tslint:disable-next-line:typedef
  deleteFunc(){
    this.delete.emit(this.tour.id);
  }

}
