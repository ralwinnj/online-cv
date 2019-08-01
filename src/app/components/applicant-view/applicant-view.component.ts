import { ApiService } from './../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { CustomData } from 'src/app/shared/custom-data';

@Component({
  selector: 'app-applicant-view',
  templateUrl: './applicant-view.component.html',
  styleUrls: ['./applicant-view.component.css']
})
export class ApplicantViewComponent implements OnInit {

  applicantData;
  experienceForm;
  educationForm;
  isLoading = true;
  responseData: any;
  myEmail: string = '';
  toDisable: boolean;
  applicant: any;
  qualificationList: any;
  professionalMembershipList: any;
  computerLiteracyList: any;
  experienceList: any;
  disciplinaryRecordList: any;
  criminalRecordList: any;
  referenceList: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private api: ApiService) { }
  ngOnInit() {
    this.getApplicantDetails();
  }



  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-title",
      size: 'lg',
      centered: true
    }).result
      .then((result) => {
        // SUCCESS LOGIC COMES HERE!!!!
      }, (reason) => {
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  delete(idx, obj) {
    obj.splice(idx, 1);
  }

  edit(row, obj) {
  }

  submitApplication() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['thank-you']);
      this.isLoading = false;
    }, 1500);

  }

  getApplicantDetails(callback?: { (): void; (): void; }) {
    let id: number = parseInt(window.localStorage.getItem('user'));

    this.isLoading = true;
    this.api.getApplicants(id)
      .subscribe(
        data => {
          this.responseData = data;
          switch (this.responseData.statusCode) {
            case 200:
              console.log(200);

              this.applicant = this.responseData.result[0].applicant;
              this.qualificationList = this.responseData.result[0].qualification;
              this.professionalMembershipList = this.responseData.result[0].professionalMembership;
              this.computerLiteracyList = this.responseData.result[0].computerLiteracy;
              this.experienceList = this.responseData.result[0].experience;
              this.disciplinaryRecordList = this.responseData.result[0].disciplinaryRecord;
              this.criminalRecordList = this.responseData.result[0].criminalRecord;
              this.referenceList = this.responseData.result[0].reference;

              if (callback) {
                callback();
              }
              break;
            case 300:
              // request came back with multiple records when it should not nav to login page
              this.openModal('Record Already Exists', this.responseData.Message || 'A user with either that email address or ID number already exists', this.responseData);
              this.toDisable = false;
              console.log(300);
              break;

            case 400:
              // request had validation errors
              this.openModal('Validation Error', this.responseData.Message || 'A few validation errors have occured, please review your form and try again', this.responseData);
              this.toDisable = false;
              console.log(400);
              break;

            case 404:
              // request came back with no data
              this.openModal('Record Not Found', this.responseData.Message, this.responseData);
              this.toDisable = false;
              console.log(404);
              break;

            case 500:
              // request came back with a server error
              this.openModal('Server Error', this.responseData.Message, this.responseData);
              this.toDisable = false;
              console.log(500);
              break;

            default:
              break;
          }

        },
        error => {
          this.openModal('Error?', error.message, error);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );

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

  getValue(type, id) {
    return CustomData.getValue(type, id);
  }
}