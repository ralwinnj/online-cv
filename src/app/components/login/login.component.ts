import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import * as mdl from '../../models/app-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  responseData: any;
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    public modalService: NgbModal) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: [null, [Validators.required]],
      rememberMe: [null],
    });
  }
  submitForm() {
    this.isLoading = true;
    if (!this.loginForm.invalid) {
      setTimeout(() => {
        const data: mdl.ILogin = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        };
        this.api.validateLogin(data)
          .subscribe(
            data => {
              this.responseData = data;
              switch (this.responseData.statusCode) {
                case 200:
                  this.router.navigate(
                    ['applicant-form']);
                  console.log(200);
                  break;
                case 300:
                  // request came back with multiple records when it should not nav to login page
                  this.openModal('Record Already Exists', this.responseData.message || 'A user with either that email address or ID number already exists', this.responseData);
                  console.log(300);
                  break;

                case 400:
                  // request had validation errors
                  this.openModal('Validation Error', this.responseData.message || 'A few validation errors have occured, please review your form and try again', this.responseData);
                  console.log(400);
                  break;

                case 404:
                  // request came back with no data
                  this.openModal('Record Not Found', this.responseData.message, this.responseData);
                  console.log(404);
                  break;

                case 409:
                  // request came back with no data
                  this.openModal('Error', this.responseData.message, this.responseData);
                  console.log(404);
                  break;

                case 500:
                  // request came back with a server error
                  this.openModal('Server Error', this.responseData.message, this.responseData);
                  console.log(500);
                  break;

                default:
                  break;
              }

            },
            error => {
              this.isLoading = false;
              this.openModal('Error', error.message, error);
            },
            () => {
              this.isLoading = false;
            }
          );

      }, 500);
    } else {
      this.isLoading = false;
      this.openModal('Information', 'Please complete the form fields marked in red.', []);
    }
  }

  openModal(title, message, object, callback?) {

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = title || 'Title Comes Here';
    modalRef.componentInstance.message = message || 'Message Comes Here';
    modalRef.componentInstance.object = object || [];
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (callback) {
        callback();
      }
    })

  }


}
