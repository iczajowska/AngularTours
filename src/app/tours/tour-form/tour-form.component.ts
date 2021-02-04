import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToursService } from 'src/app/services/tours.service';
import { ITour } from '../../itour';


@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent {
  checkoutForm;

  dateRegex = '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';
  priceRegex = '^(\\d+\\.\\d{0,2})|(\\d+)$';
  number = '^\\d+$';

  constructor(private formBuilder: FormBuilder, private toursService: ToursService, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      name:  ['', Validators.required],
      destination: ['', Validators.required],
      country:  ['', Validators.required],
      dateStart: ['', Validators.pattern(this.dateRegex)],
      dateEnd: ['', Validators.pattern(this.dateRegex)],
      price: ['', Validators.pattern(this.priceRegex)],
      description: ['', Validators.required],
      image: ['', Validators.required],
      availablePlaces: 0,
      totalPlaces: ['', [Validators.required, Validators.pattern(this.number)]],
      rating: 0.0,
      totalVotes: 0
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(customerData) {

    if (this.checkoutForm.dirty && this.checkoutForm.valid) {
      const today = new Date();

      // tslint:disable-next-line:no-shadowed-variable
      let dateParts = customerData.dateStart.split('/');

      customerData.dateStart = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); // new Date(customerData.dateStart);

      // tslint:disable-next-line:prefer-const
      dateParts = customerData.dateEnd.split('/');
      customerData.dateEnd = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); // new Date(customerData.dateEnd);
      customerData.price = parseFloat(customerData.price);
      customerData.totalPlaces = parseInt(customerData.totalPlaces, 10);
      customerData.availablePlaces = customerData.totalPlaces;

      if (today > customerData.dateStart ||  customerData.dateStart > customerData.dateEnd){
        alert('Wrong dates of trip\nStart date must be after today and end date must be after start date');
        return;
      }

      console.log(customerData);

      this.toursService.addTour(customerData);
      alert('Tour added correctly!');

      this.checkoutForm.reset();
    }else{
      alert('Invalid Form Data');
      console.log(customerData);
    }


  }

  cancelFunc(){
    this.router.navigate(['toursAdmin']);
  }

}
