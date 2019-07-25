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
  educationForm: FormGroup;
  experienceForm: FormGroup;
  birthDate: Date;
  customSelect: typeof CustomData;

  personal: {};

  personals = [];
  myEmail;
  experience: {
    idNumber: string,
    jobTitle: string;
    company: any;
    country: any;
    startDate: Date;
    endDate: Date;
    currentJob: boolean;
    reasonFortoLeaving: string
    responsibilities: string;
  }[] = [];

  education: {
    idNumber: any;
    institute: any;
    institutionCountry: any;
    qualificationTypeId: any;
    qualificationName: any;
    startDate: Date;
    endDate: Date;
    qualificationDesc: any;
  }[] = [];

  qualification: { id: number; label: string; }[];

  cvFileName;

  cvFile;

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
  responseData;
  applicantData: any;
  languages: any = [];
  natureOfEmp: any = [];
  licences: any = [];

  qualificationList = [
    // {id: 1, nameOfInstitute: "CTI", nameOfQualification: "Diploma in computer programming", typeOfQualification: "Diploma", yearObtained: 2012}
  ];
  professionalMembershipList = [];
  computerLiteracyList = [];
  experienceList = [];
  disciplinaryRecordList = [];
  criminalRecordList = [];
  referenceList = [];

  // politicalOfficeList = [];



  constructor(
    private modalService: NgbModal,
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

    this.route.queryParams.subscribe(params => {
      this.myEmail = params['email'];
      console.log(params['email']);
      if (params['email'] !== undefined) {
        this.toDisable = false;
        this.getApplicantDetails();
      } else {
        this.toDisable = false;
      }
    });


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
      driversLicenceType: [''],
      address: ['', Validators.compose([Validators.required])],
      language: [this.languageSelectedItems, Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      emailAddress: [{ value: '', disabled: false }, Validators.compose([Validators.required, Validators.email])],
      createAt: [new Date(), Validators.compose([Validators.required])],
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
                this.toDisable = true;
                // localStorage.removeItem('oja_usr');
                // localStorage.removeItem('applicant_list');
                // localStorage.removeItem('applicant_data');
                // localStorage.setItem('oja_usr', JSON.stringify(this.responseData.Result[0]));

                this.setFormValues(this.responseData.Result[0]);

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
            console.log('done loading');
          }
        );
    });

  }

  setFormValues(data: { app: { gender: any; race: any; firstName: any; lastName: any; disability: any; idNumber: any; suburb: any; residentialTown: any; residentialProvince: any; residentialCountry: any; cellNo: any; relationshipWithUs: any; criminalRecord: any; heardAboutUs: any; marketingInfo: any; }; }) {
    let myForm = this.personalForm;
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      console.log({ year: parseInt(data.app.idNumber.substring(0, 2)), month: parseInt(data.app.idNumber.substring(2, 4)), day: parseInt(data.app.idNumber.substring(4, 6)) });
      myForm.patchValue({
        gender: data.app.gender,
        ethnicity: data.app.race,
        firstName: data.app.firstName,
        lastName: data.app.lastName,
        disability: data.app.disability,
        idNumber: data.app.idNumber,
        birthDate: { year: parseInt("19" + data.app.idNumber.substring(0, 2)), month: parseInt(data.app.idNumber.substring(2, 4)), day: parseInt(data.app.idNumber.substring(4, 6)) },
        residentialSuburb: data.app.suburb,
        residentialTown: data.app.residentialTown,
        residentialProvince: data.app.residentialProvince,
        residentialCountry: data.app.residentialCountry,
        phoneNumber: data.app.cellNo,
        emailAddress: email,
        relationship: data.app.relationshipWithUs,
        criminalRecord: data.app.criminalRecord,
        heardAboutUs: data.app.heardAboutUs,
        marketingInfo: data.app.marketingInfo,
      });
    });

  }

  open(content: any) {
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

  public saveExperience() {
    this.isLoading = true;
    setTimeout(() => {
      const edata = {
        idNumber: this.personalForm.value.idNumber,
        jobTitle: this.experienceForm.value.jobTitle,
        company: this.experienceForm.value.company,
        country: parseInt(this.experienceForm.value.country),
        employStatus: 0,
        startDate: new Date(`${this.experienceForm.value.startDate.year || "1900"} ${this.experienceForm.value.startDate.month || "1"} ${this.experienceForm.value.startDate.day || "1"} 12:00:00`),
        endDate: new Date(`${this.experienceForm.value.endDate.year || "1900"} ${this.experienceForm.value.endDate.month || "1"} ${this.experienceForm.value.endDate.day || "1"} 12:00:00`),
        currentJob: this.experienceForm.value.currentJob,
        createdAt: new Date(),
        reasonFortoLeaving: this.experienceForm.value.reasonFortoLeaving,
        responsibilities: this.experienceForm.value.responsibilities,
      }


      console.log('Data to be pushed', edata);
      // alert('Thank you. Experience added successfully.');
      this.isLoading = false;
      this.api.ExperienceAdd(edata)
        .subscribe(
          data => {
            this.responseData = data;
            console.log('the response data: ', this.responseData);
            switch (this.responseData.StatusCode) {
              case 200:
                // request successful nav to next page
                // this.openModal(
                //   'Success',
                //   this.responseData.Message || 'User successfully created.',
                //   this.responseData, () => {
                //   });
                alert('Thank you. Experience added successfully.');
                this.experience.push(edata);
                this.experienceForm.reset();
                console.log(200);
                break;

              case 400:
                // request had validation errors
                alert(this.responseData.Message);
                console.log(400);
                break;

              case 500:
                // request came back with a server error
                alert(this.responseData.Message);
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
            this.isLoading = false;

            console.log('done loading');
          }
        );

    }, 1500);
  }

  public saveEducation() {
    this.isLoading = true;
    setTimeout(() => {
      const edata = {
        idNumber: this.personalForm.value.idNumber,
        institute: this.educationForm.value.institution,
        institutionCountry: this.educationForm.value.institutionCountry,
        qualificationTypeId: this.educationForm.value.qualificationTypeId,
        qualificationName: this.educationForm.value.qualificationName,
        startDate: new Date(`${this.educationForm.value.startDate.year || "1900"}-${this.educationForm.value.startDate.month || "1"}-${this.educationForm.value.startDate.day || "1"}`),
        endDate: new Date(`${this.educationForm.value.endDate.year || "1900"}-${this.educationForm.value.endDate.month || "1"}-${this.educationForm.value.endDate.day || "1"}`),
        qualificationDesc: this.educationForm.value.qualificationDesc
      }
      console.log('Data to be pushed', edata);
      console.log('Data from edu form', this.educationForm);

      this.api.EducationAdd(edata)
        .subscribe(
          data => {
            this.responseData = data;
            console.log('the response data: ', this.responseData);
            switch (this.responseData.StatusCode) {
              case 200:
                // request successful
                alert('Thank you. Education added successfully.');
                this.education.push(edata);
                this.isLoading = false;

                console.log(200, 'The education object : ', this.education, this.experience, this.personal, this.educationForm);
                // this.educationForm.reset();
                break;

              case 400:
                // request had validation errors
                alert(this.responseData.Message);
                console.log(400);
                break;

              case 500:
                // request came back with a server error
                alert(this.responseData.Message);
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
            this.isLoading = false;

            console.log('done loading');
          }
        );

    }, 500);

  }

  public saveDetails() {

    console.log('submitting....')
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
      console.log('nature of employment: ', natureOfEmp);

      if (this.personalForm.value.licenceDropdownList) {
        this.personalForm.value.licenceDropdownList.forEach((el: { item_text: any; }) => {
          this.licences.push(el.item_text);
        });
        licences = this.licences.join(', ');
      }

      this.personal = {
        gender: this.personalForm.value.gender,
        title: this.personalForm.value.title,
        ethnicity: this.personalForm.value.ethnicity,
        firstName: this.personalForm.value.firstName,
        lastName: this.personalForm.value.lastName,
        disability: this.personalForm.value.disability,
        birthDate: this.personalForm.value.birthDate,
        citizenship: this.personalForm.value.citizenship,
        idNumber: this.personalForm.value.idNumber,
        address: this.personalForm.value.address,
        residentialSuburb: this.personalForm.value.residentialSuburb,
        residentialTownOrCity: this.personalForm.value.residentialTown,
        residentialProvince: this.personalForm.value.residentialProvince,
        residentialCountry: this.personalForm.value.residentialCountry,
        phoneNumber: this.personalForm.value.phoneNumber,
        emailAddress: this.personalForm.value.emailAddress,
        natureOfEmployment: this.personalForm.value.natureOfEmployment,
        natureDropDownList: this.personalForm.value.natureDropDownList,
        relationship: this.personalForm.value.relationship,
        criminalRecord: this.personalForm.value.criminalRecord,
        driversLicence: this.personalForm.value.driversLicence,
        languages: this.personalForm.value.languages,
        heardAboutUs: this.personalForm.value.heardAboutUs,
        marketingInfo: this.personalForm.value.marketingInfo,
        KeyExpertise: ''
      }

      console.log('personal details', this.personal);
      console.log('experience details', this.experience);
      console.log('education details', this.education);

      var data = {
        firstName: this.personalForm.value.firstName,
        knowAsName: this.personalForm.value.firstName,
        lastName: this.personalForm.value.lastName,
        southAficantYN: this.personalForm.value.citizenship,
        idNumber: this.personalForm.value.idNumber,
        nationality: "South Africa",
        passportOrLocalId: "0",
        workPermitNumber: "0",
        telNo: this.personalForm.value.phoneNumber,
        cellNo: this.personalForm.value.phoneNumber,
        residentialSuburb: this.personalForm.value.residentialSuburb,
        residentialTownOrCity: this.personalForm.value.residentialTown,
        residentialProvince: parseInt(this.personalForm.value.residentialProvince),
        residentialCountry: parseInt(this.personalForm.value.residentialCountry),
        gender: parseInt(this.personalForm.value.gender),
        race: parseInt(this.personalForm.value.ethnicity),
        disability: parseInt(this.personalForm.value.disability),
        disabilityNature: parseInt(this.personalForm.value.disability),
        disabilityOther: this.personalForm.value.disability,
        highestQualification: 0,
        keyExpertise: 'N/A',
        experienceOther: "0",
        yearsOfExperience: "0",
        costToCompany: "0",
        natureOfEmployment: natureOfEmp,
        relationshipWithUs: this.personalForm.value.relationship,
        criminalRecord: false,
        driversLicense: true,
        driversLicenseType: licences,
        languageProfeciency: languages,
        heardAboutUs: this.personalForm.value.heardAboutUs,
        marketingInfo: this.personalForm.value.marketingInfo,
      }
      console.log('Data', data);
      let ctx = this
      this.api.editApplicant(data)
        .subscribe(
          data => {
            this.responseData = data;
            console.log('the response data: ', this.responseData);
            switch (this.responseData.StatusCode) {
              case 200:
                // request successful nav to next page
                this.openModal('Success', 'User details successfully Updated.', ctx.responseData, () => {
                  const val = ctx.personalForm.value.emailAddress;
                  console.log("Value is : " + val, ctx);
                  let successSave = function () {
                    console.log('naving...')
                    ctx.router.navigate(
                      ['applicant-view'],
                      {
                        queryParams: {
                          email: val
                        }
                      });
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

            console.log('done loading');
          }
        );
    }, 1500);
  }

  onFileChange(e: { srcElement: { files: any[]; }; }) {
    const fileObj = document.getElementById("input-cv-file");
    console.log(fileObj, e);
    this.cvFileName = e.srcElement.files[0].name;
    this.cvFile = e.srcElement.files[0];
    this.cvFile = this.getBase64(e.srcElement.files[0])
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
      console.log(reader);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return error
    };
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  editApplicant() {
    console.log(this.personalForm.value);
  }

  openModal(title: string, message: string, object: any[], callback?: { (): void; (): void; }) {

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = title || 'Title Comes Here';
    modalRef.componentInstance.message = message || 'Message Comes Here';
    modalRef.componentInstance.object = object || [];
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
      if (callback) {
        callback();
      }
    })
  }

  getValue(id, obj) {
    console.log('am i working.... ')
    return CustomData.getValue(id, obj);
  }

  openModalForm(type, data?, callback?) {
    let modalRef;
    switch (type.toLowerCase()) {
      case 'computer-literacy':
        modalRef = this.modalService.open(ComputerLiteracyModalComponent, { centered: true, size: 'lg' });
        if (data !== null) {
          modalRef.componentInstance.dataIn = data;
        }
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          console.log("dataReceived: ", receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.computerLiteracyList.push(el);
            });
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
          console.log("dataReceived: ", receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.qualificationList.push(el);
            });
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
          console.log("dataReceived: ", receivedDataOut);
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.professionalMembershipList.push(el);
            });
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
          console.log("dataReceived: ", receivedDataOut);
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.experienceList.push(el);
            });
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
          console.log("dataReceived: ", receivedDataOut);
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.disciplinaryRecordList.push(el);
            });
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
          console.log("dataReceived: ", receivedDataOut);
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.criminalRecordList.push(el);
            });
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
        console.log()
        modalRef.componentInstance.dataOut.subscribe((receivedDataOut: any) => {
          console.log("dataReceived: ", receivedDataOut);
          this.updateReceived(receivedDataOut);
          if (receivedDataOut != null || receivedDataOut.length > 0) {
            receivedDataOut.forEach(el => {
              this.referenceList.push(el);
            });
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

  updateReceived(received) {

  }


}
