import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryRecordModalComponent } from './disciplinary-record-modal.component';

describe('DisciplinaryRecordModalComponent', () => {
  let component: DisciplinaryRecordModalComponent;
  let fixture: ComponentFixture<DisciplinaryRecordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryRecordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
