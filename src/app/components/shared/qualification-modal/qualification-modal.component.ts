import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../../../shared/api.service';

import { CustomData } from 'src/app/shared/custom-data';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as mdl from '../../../models/app-models';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
@Component({
  selector: 'app-qualification-modal',
  templateUrl: './qualification-modal.component.html',
  styleUrls: ['./qualification-modal.component.css']
})
export class QualificationModalComponent implements OnInit {

  responseData: any;
  isLoading = false;
  years = [];
  qualifications: any;
  qualificationForm: FormGroup
  fkApplicantId: number;
  @Input() qualification: mdl.IQualification;
  @Input() dataList: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.qualifications = CustomData.qualifications;
    this.initYears();
    this.initForm();
  }

  initYears() {
    let year = new Date().getFullYear() + 10;
    for (let i = 0; i < 40; i++) {
      this.years.push(year);
      year = year - 1;
    }
  }

  initForm() {
    this.qualificationForm = this.fb.group({
      nameOfInstitute: ["", Validators.compose([Validators.required])],
      nameOfQualification: ["", Validators.compose([Validators.required])],
      typeOfQualification: ["", Validators.compose([Validators.required])],
      yearObtained: [new Date().getFullYear(), Validators.compose([Validators.required])],
      createdAt: [new Date()],
    });
  }

  save() {
    this.isLoading = true;
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      this.openModal('Error', 'No Applicant ID Found. ');
      return
    }

    let id = parseInt(localStorage.getItem('user'));

    if (this.qualificationForm.valid) {
      // if (typeof this.qualification == 'undefined')
      if (typeof this.qualification == 'undefined' || this.qualification == null) {
        setTimeout(() => {
          let data: mdl.IQualification = {
            nameOfInstitute: this.qualificationForm.value.nameOfInstitute,
            nameOfQualification: this.qualificationForm.value.nameOfQualification,
            typeOfQualification: this.qualificationForm.value.typeOfQualification,
            yearObtained: this.qualificationForm.value.yearObtained,
            createdAt: new Date(),
            fkApplicantId: id
          };

          this.api.postQualifications(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getQualifications(id)
                      .subscribe(
                        data => {
                          const d: any = data;
                          switch (d.statusCode) {
                            case 200:
                              console.log('nested: ', 200);
                              this.dataOut.emit(d.result)
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
                this.openModal('Error', error.message, error);
                this.isLoading = false;
              },
              () => {
                this.isLoading = false;

                console.log('done loading');
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
    this.qualificationForm.reset();
    this.qualificationForm.patchValue({
      nameOfInstitute: "",
      nameOfQualification: "",
      typeOfQualification: "",
      yearObtained: null,
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
