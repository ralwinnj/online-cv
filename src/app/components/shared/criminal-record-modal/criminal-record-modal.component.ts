import { ICriminalRecord } from './../../../models/app-models';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-criminal-record-modal',
  templateUrl: './criminal-record-modal.component.html',
  styleUrls: ['./criminal-record-modal.component.css']
})
export class CriminalRecordModalComponent implements OnInit {
  
  criminalRecordForm: FormGroup;
  isLoading: boolean = false;
  responseData: any;

  @Input() criminalRecord: any;
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
    this.criminalRecordForm = this.fb.group({
      id: [null],
      record: [false, Validators.compose([Validators.required])],
      typeOfCriminalAct: ['', Validators.compose([Validators.required])],
      dateFinalized: [null],
      outcome: [''],
      createdAt: [new Date()],
    });
  }

  resetForm() {
    this.criminalRecordForm.reset();
    this.criminalRecordForm.patchValue({
      record: true,
      typeOfCriminalAct: '',
      dateFinalized: null,
      outcome: '',
      createdAt: new Date(),
    });
  }

  save() {
    this.isLoading = true;
    let id = parseInt(localStorage.getItem('user'));

    if (this.criminalRecordForm.valid) {
      if (typeof this.criminalRecord == 'undefined' || this.criminalRecord == null) {
        setTimeout(() => {
          let data: ICriminalRecord = {
            record: true,
            typeOfCriminalAct: this.criminalRecordForm.value.typeOfCriminalAct,
            dateFinalized: new Date(`${this.criminalRecordForm.value.dateFinalized.year}-${this.criminalRecordForm.value.dateFinalized.month}-${this.criminalRecordForm.value.dateFinalized.day}`),
            outcome: this.criminalRecordForm.value.outcome,
            createdAt: new Date(),
            fkApplicantId: id
          };

          console.log('Request Data: ', data);
          console.log(1);
          this.api.postCriminalRecords(id, data)
            .subscribe(
              data => {
                console.log(2);
                this.responseData = data;
                console.log(3);
                console.log('the response data: ', this.responseData);
                console.log(4);
                switch (this.responseData.statusCode) {
                  case 200:
                      console.log(5);
                    console.log(200);
                    this.api.getCriminalRecords(id)
                      .subscribe(
                        data => {
                          console.log(6);
                          const d: any = data;
                          switch (d.statusCode) {
                            case 200:
                                console.log(7);
                              console.log('nested : ', 200);
                              this.dataOut.emit(d.result);
                              break;

                            default:
                                console.log(8);
                              break;
                          } 
                        },
                        error => { console.log(9); this.openModal('Error', error.message, error); },
                        () => { console.log(10); this.isLoading = false }
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
                this.isLoading = false;
                this.openModal('Error', error.message, error);
                // this.isLoading = false;
              },
              () => {
                this.resetForm();
                this.isLoading = false;
                console.log('done loading');
              }
            );

        }, 500);
      }
    } else {
      this.isLoading = false;
      this.openModal('Validation', 'Please ensure all form fields are filled in');
      console.log('Form is invalid', this.criminalRecordForm);
    }
    console.log("Data List: ", this.dataOut);
  }
  openModal(title, message, object?, callback?) { 

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

  done() {
    this.modal.dismiss();
  }
}


