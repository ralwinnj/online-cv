import { IDisciplinaryRecord } from './../../../models/app-models';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-disciplinary-record-modal',
  templateUrl: './disciplinary-record-modal.component.html',
  styleUrls: ['./disciplinary-record-modal.component.css']
})
export class DisciplinaryRecordModalComponent implements OnInit {

  disciplinaryRecordForm: FormGroup;
  isLoading: boolean = false;
  responseData: any;

  @Input() disciplinaryRecord: any;
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
    this.disciplinaryRecordForm = this.fb.group({
      record: [true],
      nameOfInstitute: ['', Validators.compose([Validators.required])],
      typeOfMisconduct: ['', Validators.compose([Validators.required])],
      dateFinalized: [null, Validators.compose([Validators.required])],
      awardSanction: ['', Validators.compose([Validators.required])],
      resign: ['', Validators.compose([Validators.required])],
      resignReason: [''],
      createdAt: [new Date(), Validators.compose([Validators.required])]
    })
  }

  save() {
    this.isLoading = true;
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      this.openModal('Error', 'No Applicant ID Found. ');
      return
    }

    let id = parseInt(localStorage.getItem('user'));

    if (this.disciplinaryRecordForm.valid) {
      if (typeof this.disciplinaryRecord == 'undefined' || this.disciplinaryRecord == null) {
        setTimeout(() => {
          let data: IDisciplinaryRecord = {
            record: true,
            nameOfInstitute: this.disciplinaryRecordForm.value.nameOfInstitute,
            typeOfMisconduct: this.disciplinaryRecordForm.value.typeOfMisconduct,
            dateFinalized: new Date(`${this.disciplinaryRecordForm.value.dateFinalized.year}-${this.disciplinaryRecordForm.value.dateFinalized.month}-${this.disciplinaryRecordForm.value.dateFinalized.day}`),
            awardSanction: this.disciplinaryRecordForm.value.awardSanction,
            resign: this.disciplinaryRecordForm.value.resign,
            resignReason: this.disciplinaryRecordForm.value.resignReason,
            createdAt: new Date(),
            fkApplicantId: id
          };

          this.api.postDisciplinaryRecords(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getDisciplinaryRecords(id)
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
                this.disciplinaryRecordForm.reset();
                this.isLoading = false;
              }
            );

        }, 500);
      }
    } else {
      this.isLoading = false;
      this.openModal('Validation error!', 'Please ensure all fields are filled in.');
    }
  }

   resetForm() {
    this.disciplinaryRecordForm.reset();
    this.disciplinaryRecordForm.patchValue({
      record: true,
      nameOfInstitute: '',
      typeOfMisconduct: '',
      dateFinalized: null,
      awardSaction: '',
      resign: '',
      resignReason: '',
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
