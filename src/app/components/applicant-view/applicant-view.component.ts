import { ApiService } from './../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
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
  myEmail:   string = '';
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService) { 
      
      // this.applicantData = JSON.parse(localStorage.getItem('oja_usr'));
    }
  ngOnInit() {
    this.experienceForm = this.fb.group({
      idNumber: [null],
      jobTitle: [null],
      company: [null],
      country: [null],
      startDate: [new Date()],
      endDate: [new Date()],
      currentJob: [false],
      createdAt: [new Date()],
      responsibilities: [null],
      reasonFortoLeaving: [null],
    });
    this.educationForm = this.fb.group({
      idNumber: [null],
      institution: [null],
      institutionCountry: [null],
      qualificationTypeId: [null],
      qualificationName: [null],
      startDate: [new Date()],
      endDate: [new Date()],
      qualificationDesc: [null],
    });
    this.isLoading = false;
    this.route.queryParams.subscribe(params => {
      this.myEmail = params['email'];
    });
    console.log('oja_usr data: ', this.applicantData);
    this.getApplicantDetails();
  }



  open(content) {
    console.log('content is : ', content)
    this.modalService.open(content, {
      ariaLabelledBy: "modal-title",
      size: 'lg',
      centered: true
    }).result
      .then((result) => {
        // SUCCESS LOGIC COMES HERE!!!!
        console.log("closed successfully!")
      }, (reason) => {
        console.log(this.getDismissReason(reason));
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
    console.log(idx, obj);
    obj.splice(idx, 1);
  }

  edit(row, obj) {
    console.log(row, obj);
  }

  submitApplication() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['thank-you']);
      this.isLoading = false;
    }, 1500);

  }


  getApplicantDetails(callback?) {
    let val = this.route.snapshot.paramMap.get('email');
    let data;
    this.route.queryParams.subscribe(params => {
      val = params['email'];
      data = {
        email: val
      };
      console.log(data);
      this.api.GetApplicant(data)
        .subscribe(
          data => {
            this.responseData = data;

            console.log('the response data: ', this.responseData);
            switch (this.responseData.StatusCode) {
              case 200:
                // request successful nav to next page
                console.log(200);
                this.applicantData = this.responseData.Result[0];
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
            this.openModal('Error?', error.message, error);
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
            console.log('done loading');
          }
        );
    });

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

  getValue(type, id) {
    console.log('am i working.... ');
    return CustomData.getValue(type, id);
  }
}
