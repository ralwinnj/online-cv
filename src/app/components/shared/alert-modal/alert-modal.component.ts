import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  @Input() public title;
  @Input() public message;
  @Input() public object;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public modal: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(`Title: ${this.title}`);
    console.log(`Message: ${this.message}`);
    console.log(`Title: `, this.object);
  }

  passBack() {
    this.passEntry.emit({ title: this.title, message: this.message });
    this.activeModal.dismiss('Cross click');
  }

}
