import { AlertModalComponent } from './../shared/alert-modal/alert-modal.component';
import { ApiService } from './../../shared/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomValidators } from 'src/app/shared/custom-validators';

import { CustomData } from 'src/app/shared/custom-data';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  /** Properties */
  isLoading = true;
  signUpForm;
  citizenshipVal = CustomData.citizenship;
  specialChar = new RegExp("(?=.[!@#\$%\^&])", "g");
  responseData;
  navObj = {
    path: '',
    params: [
      {
        paramName: '',
        paramValue: ''
      }
    ]
  };
  /** Properties End */

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit() {
    this.isLoading = false;
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      email: ["", Validators.compose([
        Validators.email,
        Validators.required])
      ],
      password: ["", Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. Check if password has a number
        // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // // 3. Check if password has uppercase letter
        // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // // 4. Check if password has lowercase letter
        // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // // 5. Check if password has special character
        // CustomValidators.patternValidator(this.specialChar, { hasSpecialCharacters: true }),
        // // 6. Check if password has a minimum of 8 characters
        Validators.minLength(8)
      ])],
      confirmPassword: ["", Validators.compose([Validators.required,])],
      phone: ["", Validators.compose([Validators.required])],
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      citizenship: ["", Validators.compose([Validators.required])],
      idNumber: ["", Validators.compose([Validators.required])],
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      })
  }

  submitForm() {
    console.log('submitting....', this.signUpForm)
    this.isLoading = true;
    setTimeout(() => {
      var data = {
        "IdNumber": this.signUpForm.value.idNumber,
        "Email": this.signUpForm.value.email,
        "Password": this.signUpForm.value.password,
        "Citizenship": parseInt(this.signUpForm.value.citizenship),
        "FirstName": this.signUpForm.value.firstName,
        "LastName": this.signUpForm.value.lastName,
        "PhoneNumber": this.signUpForm.value.phone
      }
      // this.router.navigate(['applicant-form']);
      console.log(data);
      this.api.createLogin(data)
        .subscribe(
          data => {
            this.responseData = data;
            console.log('the response data: ', this.responseData);
            switch (this.responseData.StatusCode) {
              case 200:
                // request successful nav to next page
                this.openModal('Success', this.responseData.Message || 'User successfully created.', this.responseData, 'signin');

                console.log(200);
                break;
              case 300:
                // request came back with multiple records when it should not nav to login page
                this.openModal('Record Already Exists', this.responseData.Message || 'A user with either that email address or ID number already exists', this.responseData);
                console.log(300);
                break;

              case 400:
                // request had validation errors
                this.openModal('Validation Error', this.responseData.Message || 'A few validation errors have occured, please review your form and try again', this.responseData);
                console.log(400);
                break;

              case 404:
                // request came back with no data
                this.openModal('Record Not Found', this.responseData.Message, this.responseData);
                console.log(404);
                break;

              case 500:
                // request came back with a server error
                this.openModal('Server Error', this.responseData.Message, this.responseData);
                console.log(500);
                break;

              default:
                break;
            }

          },
          error => {
            this.openModal('Error', error.message, error);
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;

            console.log('done loading');
          }
        );

      // this.isLoading = false;
    }, 1000);


    console.log('this is the form to be submitted: ', this.signUpForm);
  }



  openModal(title, message, object, navObj?) {

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = title || 'Title Comes Here';
    modalRef.componentInstance.message = message || 'Message Comes Here';
    modalRef.componentInstance.object = object || [];
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      if (!navObj) {
        navObj = null;
      } else {
        navObj.path;
        navObj.paramName;
        navObj.paramValue;
        this.router.navigate(['signin']);
      }

    })
  }

}
