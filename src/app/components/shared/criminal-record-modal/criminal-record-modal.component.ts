import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-criminal-record-modal',
  templateUrl: './criminal-record-modal.component.html',
  styleUrls: ['./criminal-record-modal.component.css']
})
export class CriminalRecordModalComponent implements OnInit {
  criminalRecordForm: FormGroup;
  dataList: any = [];
  @Input() fkApplicantId: number;
  @Input() dataIn: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.criminalRecordForm = this.fb.group({
      id: [null],
      record: [false, Validators.compose([Validators.required])],
      typeOfCriminalAct: ['', Validators.compose([Validators.required])],
      dateFinalized: [''],
      outcome: [''],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId]
    });
  }

  resetForm() {
    this.criminalRecordForm.reset();
    this.criminalRecordForm.patchValue({
      record: [true, Validators.compose([Validators.required])],
      typeOfCriminalAct: ['', Validators.compose([Validators.required])],
      dateFinalized: [''],
      outcome: [''],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId]
    });
  }

  save() {
    if (this.criminalRecordForm.valid) {
      this.dataList = [];
      this.dataList.push(this.criminalRecordForm.value);
      this.dataOut.emit(this.dataList);
      this.resetForm();
    } else {
      console.log('Form is invalid');
    }
    console.log("Data List: ", this.dataList, this.dataOut);
  }

  done() {
    this.modal.dismiss();
  }
}


