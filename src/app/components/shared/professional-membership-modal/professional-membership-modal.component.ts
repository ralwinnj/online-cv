import { IProfessionalMembership } from './../../../models/app-models';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-professional-membership-modal',
  templateUrl: './professional-membership-modal.component.html',
  styleUrls: ['./professional-membership-modal.component.css']
})
export class ProfessionalMembershipModalComponent implements OnInit {

  professionalMembershipForm: FormGroup;
  isLoading: boolean = false;
  responseData: any;

  @Input() professionalMembership: any;
  @Input() dataList: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.professionalMembershipForm = this.fb.group({
      id: [null],
      professionalBody: ['', Validators.compose([Validators.required])],
      membershipNumber: ['', Validators.compose([Validators.required])],
      expiryDate: [null, Validators.compose([Validators.required])],
      createdAt: [new Date()],
    })
  }

  save() {
    this.isLoading = true;
    let id = parseInt(localStorage.getItem('user'));

    if (this.professionalMembershipForm.valid) {
      if (typeof this.professionalMembership == 'undefined' || this.professionalMembership == null) {
        setTimeout(() => {
          let data: IProfessionalMembership = {
            professionalBody: this.professionalMembershipForm.value.professionalBody,
            membershipNumber: this.professionalMembershipForm.value.membershipNumber,
            expiryDate: new Date(`${this.professionalMembershipForm.value.expiryDate.year}-${this.professionalMembershipForm.value.expiryDate.month}-${this.professionalMembershipForm.value.expiryDate.day}`),
            createdAt: new Date(),
            fkApplicantId: id
          };

          this.api.postProfessionalMemberships(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getProfessionalMemberships(id)
                      .subscribe(
                        data => {
                          const d: any = data;
                          switch (d.statusCode) {
                            case 200:
                              console.log('nested : ', 200);
                              this.dataOut.emit(d.result);
                              break;

                            default:
                              break;
                          }
                        },
                        error => { this.openModal('Error', error.message, error); },
                        () => { this.isLoading = false }
                      )
                    break;
                  case 300:
                    // request came back with multiple records when it should only ever have one; nav to login page
                    this.openModal(
                      'Record Already Exists',
                      this.responseData.message || 'A user with either that email address or ID number already exists',
                      this.responseData);
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
                this.resetForm();

              }
            );

        }, 500);
      }
    } else {
      this.isLoading = false;
      this.openModal('Validation', 'Please ensure all form fields are filled in');
    }
  }

  resetForm() {
    this.professionalMembershipForm.reset();
    this.professionalMembershipForm.patchValue({
      professionalBody: '',
      membershipNumber: '',
      expiryDate: null,
      createdAt: new Date(),
    });
  }

  openModal(title, message, object?, callback?) {

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
