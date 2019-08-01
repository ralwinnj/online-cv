import { IReference } from './../../../models/app-models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-reference-modal',
  templateUrl: './reference-modal.component.html',
  styleUrls: ['./reference-modal.component.css']
})
export class ReferenceModalComponent implements OnInit {
  referenceForm: FormGroup;
  isLoading: boolean = false;
  responseData: any;

  @Input() reference: any;
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
    this.referenceForm = this.fb.group({
      id: [null],
      name: ['', Validators.compose([Validators.required])],
      relationship: ['', Validators.compose([Validators.required])],
      telNumber: ['', Validators.compose([Validators.required])],
      cellNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      createdAt: [new Date(), Validators.compose([Validators.required])],
    })
  }

  save() {
    this.isLoading = true;
    let id = parseInt(localStorage.getItem('user'));

    if (this.referenceForm.valid) {
      if (typeof this.reference == 'undefined' || this.reference == null) {
        setTimeout(() => {
          let data: IReference = {
            name: this.referenceForm.value.name,
            relationship: this.referenceForm.value.relationship,
            telNumber: this.referenceForm.value.telNumber,
            cellNumber: this.referenceForm.value.cellNumber,
            email: this.referenceForm.value.email,
            createdAt: new Date(),
            fkApplicantId: id
          };

          this.api.postReference(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getReference(id)
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
                // this.isLoading = false;
              },
              () => {
                this.resetForm();
                this.isLoading = false;

              }
            );

        }, 500);
      } else {
        this.isLoading = false;
        return;
      }
    } else {
      this.isLoading = false;
      this.openModal('Validation', 'Please ensure all form fields are filled in');
    }
  }

  resetForm() {
    this.referenceForm.reset();
    this.referenceForm.patchValue({
      name: '',
      relationship: '',
      telNumber: '',
      cellNumber: '',
      email: '',
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
