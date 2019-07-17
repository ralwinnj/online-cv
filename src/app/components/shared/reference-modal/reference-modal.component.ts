import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reference-modal',
  templateUrl: './reference-modal.component.html',
  styleUrls: ['./reference-modal.component.css']
})
export class ReferenceModalComponent implements OnInit {
  fkApplicantId: Number;
  referenceForm: FormGroup;
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
    this.referenceForm = this.fb.group({
      id: [null],
      name: ['', Validators.compose([Validators.required])],
      relationship: ['', Validators.compose([Validators.required])],
      telNumber: ['', Validators.compose([Validators.required])],
      cellNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      createdAt: [new Date(), Validators.compose([Validators.required])],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    })
  }

  save() {
    console.log('Save: ', this.referenceForm);
    if (this.referenceForm.valid) {
      this.dataList = [];
      this.dataList.push(this.referenceForm.value);
      this.dataOut.emit(this.dataList);
      this.referenceForm.reset();
      this.referenceForm.patchValue({
        createdAt: [new Date()],
        fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
      });
    } else {
      console.log('Form is invalid');
    }
    console.log("Data List: ", this.dataList, this.dataOut);
  }

}
