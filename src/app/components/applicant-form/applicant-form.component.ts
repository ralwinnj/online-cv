import { ReferenceModalComponent } from './../shared/reference-modal/reference-modal.component';
import { CriminalRecordModalComponent } from './../shared/criminal-record-modal/criminal-record-modal.component';
import { DisciplinaryRecordModalComponent } from './../shared/disciplinary-record-modal/disciplinary-record-modal.component';
import { ProfessionalMembershipModalComponent } from './../shared/professional-membership-modal/professional-membership-modal.component';
import { ComputerLiteracyModalComponent } from './../shared/computer-literacy-modal/computer-literacy-modal.component';
import { QualificationModalComponent } from './../shared/qualification-modal/qualification-modal.component';
import { ApiService } from './../../shared/api.service';
import { CustomData } from 'src/app/shared/custom-data';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

import * as mdl from '../../models/app-models';

import '../../../assets/js/scripts.js';
import { ExperienceModalComponent } from '../shared/experience-modal/experience-modal.component';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.css']
})

export class ApplicantFormComponent implements OnInit {

  isLoading = false;
  toDisable = true;
  personalForm: FormGroup;
  customSelect: typeof CustomData;

  personal: {};

  qualification: { id: number; label: string; }[];

  cvFileName: any;

  cvFile: any;

  natureDropDownListObj = [];
  natureSelectedItems = [];

  licenceDropDownListObj = [];
  licenceSelectedItems = [];

  languageDropDownListObj = [];
  languageSelectedItems = [];

  provinces = CustomData.province;
  countries = CustomData.country

  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  dropdownSettings: any = {};
  loginData: any;
  responseData: any;
  applicantData: any;
  languages: any = [];
  natureOfEmp: any = [];
  licences: any = [];

  qualificationList = [];
  professionalMembershipList = [];
  computerLiteracyList = [];
  experienceList = [];
  disciplinaryRecordList = [];
  criminalRecordList = [];
  referenceList = [];

  // politicalOfficeList = [];



  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    //private ngbTooltip: NgbTooltip
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initPage();
    this.getApplicantDetails();
  }

  public initForm() {

    this.personalForm = this.fb.group({
      gender: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      race: ['', Validators.compose([Validators.required])],
      dependant: [false, Validators.compose([Validators.required])],
      dependentAge: [''],
      disability: [false, Validators.compose([Validators.required])],
      disabilityNature: [''],
      citizenship: ['', Validators.compose([Validators.required])],
      idNumber: ['', Validators.compose([Validators.required])],
      nationality: ['', Validators.compose([Validators.required])],
      workPermitNumber: [''],
      sarsRegistered: [true, Validators.compose([Validators.required])],
      sarsTaxNumber: [''],
      driversLicence: [false, Validators.compose([Validators.required])],
      driversLicenceType: [null],
      address: ['', Validators.compose([Validators.required])],
      language: [this.languageSelectedItems, Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      emailAddress: [{ value: '', disabled: false }, Validators.compose([Validators.required, Validators.email])],
      createdAt: [new Date(), Validators.compose([Validators.required])],
      natureOfEmployment: ['', Validators.compose([Validators.required])],
      natureDropdownList: [this.natureSelectedItems],
      licenceDropdownList: [this.licenceSelectedItems],
      languageDropdownList: [this.languageSelectedItems],
      relationship: ['', Validators.compose([Validators.required])],
      criminalRecord: ['', Validators.compose([Validators.required])],
      languages: ['', Validators.compose([Validators.required])],
      heardAboutUs: ['', Validators.compose([Validators.required])],
      marketingInfo: ['', Validators.compose([Validators.required])],
      cvFile: ['', Validators.compose([Validators.required])],
      birthDate: [''],
    });

    this.qualification = CustomData.qualifications;
  }

  public initPage() {

    this.natureDropDownListObj = [
      { item_id: 1, item_text: 'Bursary' },
      { item_id: 2, item_text: 'Contract' },
      { item_id: 3, item_text: 'Internship' },
      { item_id: 4, item_text: 'Learnership' },
      { item_id: 5, item_text: 'Permanent' }
    ]

    this.licenceDropDownListObj = [
      { item_id: 1, item_text: 'A1 - Motorcycle 125cc or less' },
      { item_id: 2, item_text: 'A - Motorcycle' },
      { item_id: 3, item_text: 'B - Motor vehicle' },
      { item_id: 4, item_text: 'EB - Motor vehicle + trailer' },
      { item_id: 5, item_text: 'C1 - Busses and goods vehicle < 16 ton' },
      { item_id: 6, item_text: 'C - Busses and goods vehicle > 16 ton' },
      { item_id: 7, item_text: 'Articulated vehicle > 16 ton' },
      { item_id: 8, item_text: 'Articulated vehicle < 16 ton' },
      { item_id: 9, item_text: 'Forklift' },
      { item_id: 10, item_text: 'PDP' },
    ];

    this.languageDropDownListObj = [
      { item_id: 1, item_text: 'Afrikaans' },
      { item_id: 2, item_text: 'English' },
      { item_id: 3, item_text: 'isiNdebele' },
      { item_id: 4, item_text: 'isiXhosa' },
      { item_id: 5, item_text: 'isiZulu' },
      { item_id: 6, item_text: 'Nothern Sotho' },
      { item_id: 7, item_text: 'Sesotho' },
      { item_id: 8, item_text: 'Setswana' },
      { item_id: 9, item_text: 'SiSwati' },
      { item_id: 10, item_text: 'Tshivenda' },
      { item_id: 11, item_text: 'Xitsonga' },
      { item_id: 12, item_text: 'Other' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.customSelect = CustomData;
  }

  getApplicantDetails(callback?: { (): void; (): void; }) {
    let val = this.route.snapshot.paramMap.get('email');
    let data: { email: string; };
    let id: number = parseInt(window.localStorage.getItem('user'));
    this.api.getApplicants(id)
      .subscribe(
        data => {
          this.responseData = data;

          switch (this.responseData.statusCode) {
            case 200:
              // request successful
              console.log(200);

              this.setFormValues(this.responseData.result[0]);

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
              console.log(300);
              this.toDisable = false;
              break;

            case 400:
              // request had validation errors
              this.openModal('Validation Error', this.responseData.Message || 'A few validation errors have occured, please review your form and try again', this.responseData);
              console.log(400);
              this.toDisable = false;
              break;

            case 404:
              // request came back with no data
              this.openModal('Record Not Found', this.responseData.Message, this.responseData);
              console.log(404);
              this.toDisable = false;
              break;

            case 500:
              // request came back with a server error
              this.openModal('Server Error', this.responseData.Message, this.responseData);
              console.log(500);
              this.toDisable = false;
              break;

            default:
              break;
          }

        },
        error => {
          this.openModal('Error?', error.message, error);
          this.isLoading = false;
          this.toDisable = false;
        },
        () => {
          this.isLoading = false;
          this.toDisable = false;
        }
      );

  }

  setFormValues(data: any) {
    this.personalForm.patchValue({
      gender: data.applicant.gender,
      title: data.applicant.title,
      firstName: data.applicant.firstName,
      lastName: data.applicant.lastName,
      race: data.applicant.race,
      dependant: data.applicant.dependant,
      dependentAge: data.applicant.dependantAge,
      disability: data.applicant.disability,
      disabilityNature: data.applicant.disabilityNature,
      citizenship: data.applicant.citizenship,
      idNumber: data.applicant.idNumber,
      nationality: data.applicant.nationality,
      workPermitNumber: data.applicant.workPermitNumber,
      sarsRegistered: data.applicant.sarsRegistered,
      sarsTaxNumber: data.applicant.sarsTaxNumber,
      driversLicence: data.applicant.driversLicence,
      driversLicenceType: JSON.parse(data.applicant.driversLicenceType),
      address: data.applicant.address,
      language: JSON.parse(data.applicant.language),
      phoneNumber: data.applicant.phoneNumber,
      emailAddress: data.login[0].email,
      createdAt: data.applicant.createdAt,
      natureOfEmployment: JSON.parse(data.applicant.natureOfEmployment),
      relationship: data.applicant.relationship,
      heardAboutUs: data.applicant.heardAboutUs,
      marketingInfo: data.applicant.marketingInfo,
      birthDate: ((data.applicant.birthDate != null) ? {
        year: new Date(data.applicant.birthDate).getFullYear(),
        month: new Date(data.applicant.birthDate).getMonth(),
        day: new Date(data.applicant.birthDate).getDay()
      } : null),
    });
  };


  open(content: any) {
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

  public saveDetails() {
    this.isLoading = true;
    setTimeout(() => {
      let languages: any;
      let natureOfEmp: any;
      let licences: any;

      if (this.personalForm.value.languageDropdownList) {
        this.personalForm.value.languageDropdownList.forEach((el: { item_text: any; }) => {
          this.languages.push(el.item_text);
        });
        languages = this.languages.join(', ');
      }

      if (this.personalForm.value.natureDropdownList) {
        this.personalForm.value.natureDropdownList.forEach((el: { item_text: any; }) => {
          this.natureOfEmp.push(el.item_text);
        });
        natureOfEmp = this.natureOfEmp.join(', ');
      }

      if (this.personalForm.value.licenceDropdownList) {
        this.personalForm.value.licenceDropdownList.forEach((el: { item_text: any; }) => {
          this.licences.push(el.item_text);
        });
        licences = this.licences.join(', ');
      }

      let id: number = parseInt(window.localStorage.getItem('user'));

      let data: mdl.IApplicant = {
        id: id,
        title: this.personalForm.value.title,
        firstName: this.personalForm.value.firstName,
        lastName: this.personalForm.value.lastName,
        gender: this.personalForm.value.gender,
        race: this.personalForm.value.race,
        dependant: this.personalForm.value.dependant,
        dependantAge: this.personalForm.value.dependantAge,
        disability: this.personalForm.value.disability,
        disabilityNature: this.personalForm.value.disabilityNature,
        citizenship: this.personalForm.value.citizenship,
        idNumber: this.personalForm.value.idNumber,
        nationality: this.personalForm.value.nationality,
        workPermitNumber: this.personalForm.value.workPermitNumber,
        sarsRegistered: this.personalForm.value.sarsRegistered,
        sarsTaxNumber: this.personalForm.value.sarsTaxNumber,
        driversLicence: ((this.personalForm.value.driversLicenceType == "") ? true : false),
        driversLicenceType: JSON.stringify(this.personalForm.value.driversLicenceType),
        address: this.personalForm.value.address,
        language: JSON.stringify(this.personalForm.value.language),
        phoneNumber: this.personalForm.value.phoneNumber,
        natureOfEmployment: JSON.stringify(this.personalForm.value.natureOfEmployment),
        relationship: this.personalForm.value.relationship,
        heardAboutUs: this.personalForm.value.heardAboutUs,
        marketingInfo: this.personalForm.value.marketingInfo,
        birthDate: new Date(`${this.personalForm.value.birthDate.year}-${this.personalForm.value.birthDate.month}-${this.personalForm.value.birthDate.day}`),
      }

      let ctx = this
      this.api.putApplicant(id, data)
        .subscribe(
          data => {
            this.responseData = data;
            switch (this.responseData.statusCode) {
              case 200:
                // request successful nav to next page
                this.openModal('Success', 'User details successfully Updated.', ctx.responseData, () => {
                  const val = ctx.personalForm.value.emailAddress;
                  let successSave = function () {
                    ctx.router.navigate(['applicant-view']);
                  };
                  this.getApplicantDetails(() => { successSave() });

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
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
    }, 500);
  }

  onFileChange(e: { srcElement: { files: any[]; }; }) {
    const fileObj = document.getElementById("input-cv-file");
    this.cvFileName = e.srcElement.files[0].name;
    this.cvFile = e.srcElement.files[0];
    this.cvFile = this.getBase64(e.srcElement.files[0]);
    // this.cvFileName =
  }

  openDoc() {
    // const data = this.getBase64(file);
    window.open(this.cvFile);
  }

  private getBase64(file: Blob) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      return error
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  toogleShowFilter() {
    // this.ShowFilter = !this.ShowFilter;
    // this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      // this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      // this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  editApplicant() {
  }

  openModal(title: string, message: string, object: any[], callback?: { (): void; (): void; }) {

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = title || 'Title Comes Here';
    modalRef.componentInstance.message = message || 'Message Comes Here';
    modalRef.componentInstance.object = object || [];
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      if (callback) {
        callback();
      }
    })
  }


  openModalForm(type: any, data?: any, callback?: any) {
    let modalRef: any;
    switch (type.toLowerCase()) {
      case 'computer-literacy':
        modalRef = this.modalService.open(ComputerLiteracyModalComponent, { centered: true, size: 'lg' });
        if (data !== null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.computerLiteracyList = receivedDataOut;
          } else {
            this.computerLiteracyList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        });

        break;
      case 'qualification':
        modalRef = this.modalService.open(QualificationModalComponent, { centered: true, size: 'lg' });
        if (data !== null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.qualificationList = receivedDataOut;
          } else {
            this.qualificationList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        });
        break;
      case 'professional-membership':
        modalRef = this.modalService.open(ProfessionalMembershipModalComponent, { centered: true, size: 'lg' });
        if (data != null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.professionalMembershipList = receivedDataOut;
          } else {
            this.professionalMembershipList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        })
        break;
      case 'experience':
        modalRef = this.modalService.open(ExperienceModalComponent, { centered: true, size: 'lg' });
        if (data != null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.experienceList = receivedDataOut;
          } else {
            this.experienceList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        })
        break;
      case 'disciplinary-record':
        modalRef = this.modalService.open(DisciplinaryRecordModalComponent, { centered: true, size: 'lg' });
        if (data != null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.disciplinaryRecordList = receivedDataOut;
          } else {
            this.disciplinaryRecordList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        })
        break;
      case 'criminal-record':
        modalRef = this.modalService.open(CriminalRecordModalComponent, { centered: true, size: 'lg' });
        if (data != null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.criminalRecordList = receivedDataOut;
          } else {
            this.criminalRecordList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        })
        break;
      case 'reference':
        modalRef = this.modalService.open(ReferenceModalComponent, { centered: true, size: 'lg' });
        if (data != null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            this.referenceList = receivedDataOut;
          } else {
            this.referenceList = receivedDataOut;
          }
          if (callback) {
            callback();
          }
        })
        break;
      default:
        break;
    }
  }

  updateReceived(received: any) {
  }

  getDate(d) {
    let dt = new Date(`${d.year}-${d.month}-${d.day}`);
    return dt.toISOString().substring(0,1);
  }

}
