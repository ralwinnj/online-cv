import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CustomData } from 'src/app/shared/custom-data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-qualification-modal',
  templateUrl: './qualification-modal.component.html',
  styleUrls: ['./qualification-modal.component.css']
})
export class QualificationModalComponent implements OnInit {

  years = [];
  qualifications: any;
  qualificationForm: FormGroup
  fkApplicantId: number;
  @Input() dataList: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal
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
    console.log(this.years);
  }

  initForm() {
    this.qualificationForm = this.fb.group({
      nameOfInstitute: ["", Validators.compose([Validators.required])],
      nameOfQualification: ["", Validators.compose([Validators.required])],
      typeOfQualification: ["", Validators.compose([Validators.required])],
      yearObtained: [new Date().getFullYear(), Validators.compose([Validators.required])],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    });
  }

  save() {
    console.log(this.qualificationForm)
    if (this.qualificationForm.valid) {
      this.dataList = [];
      this.dataList.push(this.qualificationForm.value);
      this.dataOut.emit(this.dataList);
      this.qualificationForm.reset();
      this.qualificationForm.patchValue({
        yearObtained: [new Date().getFullYear()],
        createdAt: [new Date()],
        fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
      });
    } else {
      console.log('Form is invalid');
    }


    console.log("Data List: ", this.dataList, this.dataOut);
  }

}







