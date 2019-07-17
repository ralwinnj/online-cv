import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-disciplinary-record-modal',
  templateUrl: './disciplinary-record-modal.component.html',
  styleUrls: ['./disciplinary-record-modal.component.css']
})
export class DisciplinaryRecordModalComponent implements OnInit {

  fkApplicantId: Number;
  disciplinaryRecordForm: FormGroup;
  @Input() dataList: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.disciplinaryRecordForm = this.fb.group({
      id: [null],
      record: [true],
      nameOfInstitute: ['', Validators.compose([Validators.required])],
      typeOfMisconduct: ['', Validators.compose([Validators.required])],
      dateFinalized: ['', Validators.compose([Validators.required])],
      awardSanction: ['', Validators.compose([Validators.required])],
      resign: ['', Validators.compose([Validators.required])],
      resignReason: [''],
      createdAt: [new Date(), Validators.compose([Validators.required])],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    })
  }

  save() {
    console.log('Save: ', this.disciplinaryRecordForm);
    if (this.disciplinaryRecordForm.valid) {
      this.dataList = [];
      this.dataList.push(this.disciplinaryRecordForm.value);
      this.dataOut.emit(this.dataList);
      this.disciplinaryRecordForm.reset();
      this.disciplinaryRecordForm.patchValue({
        createdAt: [new Date()],
        fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
      });
    } else {
      console.log('Form is invalid');
    }
    console.log("Data List: ", this.dataList, this.dataOut);
  }

}
