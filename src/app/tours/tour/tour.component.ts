import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ITour } from '../../itour';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent  {
  @Input() tour:ITour;
  @Input() bordCol: string;
  @Output() resign = new EventEmitter<Number>();
  @Output() book = new EventEmitter<Number>();
  @Output() delete = new EventEmitter<Number>();
  faTrashAlt = faTrashAlt;
  userVote = 0;
  currentRating;
  currentVotes;

  constructor(config: NgbRatingConfig) { 
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit(): void {
    
    this.currentRating = this.tour.rating;
    this.currentVotes = this.tour.totalVotes;
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

  somethingChanged(num){    

    console.log(num);

    this.tour.rating = (this.currentRating*this.currentVotes + num)/(this.currentVotes+1);
    this.tour.totalVotes = this.currentVotes+1;
  }

}
