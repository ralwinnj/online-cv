import { IComputerLiteracy } from './../../../models/app-models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomData } from 'src/app/shared/custom-data';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';


@Component({
  selector: 'app-computer-literacy-modal',
  templateUrl: './computer-literacy-modal.component.html',
  styleUrls: ['./computer-literacy-modal.component.css']
})
export class ComputerLiteracyModalComponent implements OnInit {
  @Input() computerLiteracy
  @Input() dataList;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  isLoading: boolean = false;

  responseData: any;
  computerLiteracyForm: FormGroup;
  skills: any = CustomData.skills;
  competencies: any = CustomData.competencies;

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
    this.computerLiteracyForm = this.fb.group({
      skill: ["", Validators.compose([Validators.required])],
      competency: ["", Validators.compose([Validators.required])],
      createdAt: [new Date()],
    });
  }

  save() {
    this.isLoading = true;
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      alert('Error: No Applicant ID Found');
      return
    }

    let id = parseInt(localStorage.getItem('user'));

    if (this.computerLiteracyForm.valid) {
      // if (typeof this.qualification == 'undefined')
      if (typeof this.computerLiteracy == 'undefined' || this.computerLiteracy == null) {
        setTimeout(() => {
          let data: IComputerLiteracy = {
            skill: this.computerLiteracyForm.value.skill,
            competency: this.computerLiteracyForm.value.competency,
            createdAt: new Date(),
            fkApplicantId: id
          };

          console.log('Request Data: ', data);
          this.api.postComputerLiteracies(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                console.log('the response data: ', this.responseData);
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getComputerLiteracies(id)
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

                console.log('done loading');
              }
            );

        }, 500);
      }
    } else {
      this.isLoading = false;
      this.openModal('Validation error!', 'Please ensure all fields are filled in.');
    }
    console.log("Data List: ", this.dataOut);
  }

  resetForm() {
    this.computerLiteracyForm.reset();
    this.computerLiteracyForm.patchValue({
      skill: "",
      competency: "",
      createdAt: new Date(),
    });
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
}
