import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITour } from 'src/app/itour';
import { AuthService } from 'src/app/services/auth.service';
import { ToursService } from 'src/app/services/tours.service';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour-admin-edit',
  templateUrl: './tour-admin-edit.component.html',
  styleUrls: ['./tour-admin-edit.component.css']
})
export class TourAdminEditComponent implements OnInit {
  tour: ITour;
  tourID: string;
  checkoutForm;
  dateRegex = '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';
  priceRegex = '^(\\d+\\.\\d{0,2})|(\\d+)$';
  number = '^\\d+$';


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private toursService: ToursService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.tourID = this.route.snapshot.paramMap.get('id');
    console.log(this.tourID);

    this.toursService.getTour(this.tourID).pipe(
      map(c =>
      ({
        id: c.payload.id, ...c.payload.data()
       })
      )
      ).subscribe(t => {
        t.dateStart = t.dateStart.toDate();
        t.dateEnd = t.dateEnd.toDate();
        this.tour = t;
        let d1 = this.tour.dateStart;
        let d2 = this.tour.dateEnd;
        let dateStartString = String(d1.getDate()).padStart(2, '0')+'/'+String(d1.getMonth() + 1).padStart(2, '0')+'/'+d1.getFullYear();
        let dateEndString = String(d2.getDate()).padStart(2, '0')+'/'+String(d2.getMonth() + 1).padStart(2, '0')+'/'+d2.getFullYear();


        this.checkoutForm = this.formBuilder.group({
          name:  [this.tour.name, Validators.required],
          destination: [this.tour.destination, Validators.required],
          country:  [this.tour.country, Validators.required],
          dateStart: [dateStartString, Validators.pattern(this.dateRegex)],
          dateEnd: [dateEndString, Validators.pattern(this.dateRegex)],
          price: [parseFloat(String(this.tour.price)).toFixed(2), Validators.pattern(this.priceRegex)],
          description: [this.tour.description, Validators.required],
          image: [this.tour.image, Validators.required],
          availablePlaces: this.tour.availablePlaces,
          totalPlaces: [this.tour.totalPlaces, [Validators.required, Validators.pattern(this.number)]],
          rating: this.tour.rating,
          totalVotes: this.tour.totalVotes
        });
      }, err => console.log(err));
  }

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
      
      if(this.tour.totalPlaces-this.tour.availablePlaces > customerData.totalPlaces ){
        alert('Too low number of total places.\nThere are reservations for this tour.');
        return;
      } else {
        customerData.availablePlaces = customerData.totalPlaces - (this.tour.totalPlaces - this.tour.availablePlaces);
      }
      //customerData.availablePlaces = customerData.totalPlaces;

      if (today > customerData.dateStart ||  customerData.dateStart > customerData.dateEnd){
        alert('Wrong dates of trip\nStart date must be after today and end date must be after start date');
        return;
      }

      console.log(customerData);
      this.toursService.updateTour(this.tour.id, customerData);

      //this.toursService.addTour(customerData);
      alert('Tour updated correctly!');

      this.checkoutForm.reset();
    }else{
      if(this.checkoutForm.dirty){
        alert('No changes have been made' );
      } else{
        alert('Incorrect Form' );
      }      
      console.log(customerData, this.checkoutForm.dirty, this.checkoutForm.valid);
    }


  }

  cancelFunc(){
    this.router.navigate(['toursAdmin']);
  }

}
