import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit {

  fkApplicantId: Number;
  workExperienceForm: FormGroup;
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
    this.workExperienceForm = this.fb.group({
      id: [null],
      employer: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: [''],
      reasonForLeaving: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    })
  }

  save() {
    console.log('Save: ', this.workExperienceForm);
    if (this.workExperienceForm.valid) {
      this.dataList = [];
      this.dataList.push(this.workExperienceForm.value);
      this.dataOut.emit(this.dataList);
      this.workExperienceForm.reset();
      this.workExperienceForm.patchValue({
        createdAt: [new Date()],
        fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
      });
    } else {
      console.log('Form is invalid');
    }
    console.log("Data List: ", this.dataList, this.dataOut);
  }

}
