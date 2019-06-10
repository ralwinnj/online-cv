import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  applicantData;
  constructor() { }

  ngOnInit() {
    this.applicantData = JSON.parse(localStorage.getItem('applicant_data'));
  }

}
