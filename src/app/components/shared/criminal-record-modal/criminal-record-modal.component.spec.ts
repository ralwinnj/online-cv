import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalRecordModalComponent } from './criminal-record-modal.component';

describe('CriminalRecordModalComponent', () => {
  let component: CriminalRecordModalComponent;
  let fixture: ComponentFixture<CriminalRecordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriminalRecordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriminalRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
