import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { ITour } from '../../itour';


@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent {
  checkoutForm;
  @Input() idMax: number;
  @Output() tourForm = new EventEmitter<ITour>();

  dateRegex ='^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';
  priceRegex = "^\\d+\\.\\d{0,2}$";
  number = "^\\d+$";
  

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      id: 0,
      name:  ["", Validators.required],
      destination: ["", Validators.required],
      country:  ["", Validators.required],
      dateStart: ["", Validators.pattern(this.dateRegex)],
      dateEnd: ["", Validators.pattern(this.dateRegex)],
      price: ["", Validators.pattern(this.priceRegex)],
      description: ["", Validators.required],
      image: ["", Validators.required],
      availablePlaces: 0,
      totalPlaces: ["", Validators.pattern(this.number)],
      rating: 0.0,
      totalVotes: 0
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData) {

    if (this.checkoutForm.dirty && this.checkoutForm.valid) {
      let today = new Date();
      
      customerData.id = this.idMax;
      customerData.dateStart = new Date(customerData.dateStart);
      customerData.dateEnd = new Date(customerData.dateEnd);
      customerData.price = parseFloat(customerData.price);
      customerData.totalPlaces = parseInt(customerData.totalPlaces, 10);
      customerData.availablePlaces = customerData.totalPlaces;

      if(today > customerData.dateStart ||  customerData.dateStart> customerData.dateEnd){
        alert("Wrong dates of trip\nStart date must be after today and end date must be after start date")
        return;
      }

      console.log(customerData);
      this.tourForm.emit(customerData);

      this.checkoutForm.reset();
    }else{
      alert("Invalid Form Data");
      console.log(customerData);
    }


  }

}
