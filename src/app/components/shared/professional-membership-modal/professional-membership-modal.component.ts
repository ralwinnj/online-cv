import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-professional-membership-modal',
  templateUrl: './professional-membership-modal.component.html',
  styleUrls: ['./professional-membership-modal.component.css']
})
export class ProfessionalMembershipModalComponent implements OnInit {

  fkApplicantId: Number = null;
  @Input() dataList: any;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  professionalMembershipForm: FormGroup;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.professionalMembershipForm = this.fb.group({
      id: [null],
      professionalBody: ['', Validators.compose([Validators.required])],
      membershipNumber: ['', Validators.compose([Validators.required])],
      expiryDate: ['', Validators.compose([Validators.required])],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    })
  }

  save() {
    console.log('Save: ', this.professionalMembershipForm);
    if (this.professionalMembershipForm.valid) {
      this.dataList = [];
      this.dataList.push(this.professionalMembershipForm.value);
      this.dataOut.emit(this.dataList);
      this.professionalMembershipForm.reset();
      this.professionalMembershipForm.patchValue({
        createdAt: [new Date()],
        fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
      });
    } else {
      console.log('Form is invalid');
    }
    console.log("Data List: ", this.dataList, this.dataOut);
  }
}
