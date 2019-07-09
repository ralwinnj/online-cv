import { EncrDecrService } from './../../shared/encr-decr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoading = false;
  responseData;
  loginForm


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    public modalService: NgbModal,
    private encrDecr: EncrDecrService) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: [null, [Validators.required]],
      rememberMe: [null],
    });

    const encrypted = this.encrDecr.set('123456$#@$^@1ERF', 'ralwinn');
    const decrypted = this.encrDecr.get('123456$#@$^@1ERF', encrypted);

    console.log('Encrypted :' + encrypted);
    console.log('Dencrypted :' + decrypted);

  }
  submitForm() {
    console.log('submitting....', this.loginForm);
    this.isLoading = true;
    if (!this.loginForm.invalid) {

      setTimeout(() => {

        const data = {
          "Email": this.loginForm.value.email,
          "Password": this.loginForm.value.password
        };
        this.api.ValidateLogin(data)
          .subscribe(
            data => {
              this.responseData = data;
              console.log('the response data: ', this.responseData);
              switch (this.responseData.StatusCode) {
                case 200:
                  // request successful nav to next page
                  // this.openModal(
                  //   'Success',
                  //   this.responseData.Message || 'User successfully created.',
                  //   this.responseData, () => {
                  //   });
                  const val = this.loginForm.value.email;
                  this.router.navigate(
                    ['applicant-form'],
                    {
                      queryParams: {
                        email: this.loginForm.value.email
                      }
                    });
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
              // this.isLoading = false;
            },
            () => {
              this.isLoading = false;

              console.log('done loading');
            }
          );

      }, 2000);
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
      console.log(receivedEntry);
      if (callback) {
        callback();
      }
    })

  }

  
}
