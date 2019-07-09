import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomData } from 'src/app/shared/custom-data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-computer-literacy-modal',
  templateUrl: './computer-literacy-modal.component.html',
  styleUrls: ['./computer-literacy-modal.component.css']
})
export class ComputerLiteracyModalComponent implements OnInit {
  @Input() fkApplicantId;
  @Input() dataIn;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();
  dataList = [];

  skills: any = CustomData.skills;
  competencies: any = CustomData.competencies;

  computerLiteracyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.computerLiteracyForm = this.fb.group({
      skill: ["" , Validators.compose([Validators.required])],
      competency: ["" , Validators.compose([Validators.required])],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    });
  }

  logData() {
    console.log(`Data In  : `, this.dataIn);
    console.log(`Data Out : `, this.dataOut);
  }

  getValue(type, id) {
    console.log('am i working.... ');
    return CustomData.getValue(type, id);
  }

  save() {
    this.dataList.push(this.computerLiteracyForm.value);
    this.dataOut.emit(this.dataList);
    this.computerLiteracyForm.reset();
    this.computerLiteracyForm.patchValue({
      skill: ["" , Validators.compose([Validators.required])],
      competency: ["" , Validators.compose([Validators.required])],
      createdAt: [new Date()],
      fkApplicantId: [this.fkApplicantId || Math.floor(Date.now() / 1000)]
    });

    console.log("Data List: ", this.dataList, this.dataOut);
  }

  done() {

  }
}