import { IExperience } from './../../../models/app-models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit {

  workExperienceForm: FormGroup;
  isLoading: boolean = false;
  responseData: any;

  @Input() experience: any;
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
    this.workExperienceForm = this.fb.group({
      employer: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      reasonForLeaving: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      createdAt: [new Date()],
    })
  }

  save() {
    this.isLoading = true;
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '') {
      this.openModal('Error', 'No Applicant ID Found. ');
      return
    }

    let id = parseInt(localStorage.getItem('user'));
    if (this.workExperienceForm.valid) {
      if (typeof this.experience == 'undefined' || this.experience == null) {
        setTimeout(() => {
          let data: IExperience = {
            employer: this.workExperienceForm.value.employer,
            position: this.workExperienceForm.value.position,
            startDate: new Date(`${this.workExperienceForm.value.startDate.year}-${this.workExperienceForm.value.startDate.month}-${this.workExperienceForm.value.startDate.day}`),
            endDate: new Date(`${this.workExperienceForm.value.endDate.year}-${this.workExperienceForm.value.endDate.month}-${this.workExperienceForm.value.endDate.day}`),
            reasonForLeaving: this.workExperienceForm.value.reasonForLeaving,
            description: this.workExperienceForm.value.description,
            createdAt: new Date(),
            fkApplicantId: id
          };

          this.api.postExperiences(id, data)
            .subscribe(
              data => {
                this.responseData = data;
                switch (this.responseData.statusCode) {
                  case 200:
                    console.log(200);
                    this.api.getExperiences(id)
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
      this.openModal('Validation error!', 'Please ensure all fields are filled in.');
    }
  }

  resetForm() {
    this.workExperienceForm.reset();
    this.workExperienceForm.patchValue({
      employer: '',
      position: '',
      startDate: null,
      endDate: null,
      reasonForLeaving: '',
      description: '',
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
