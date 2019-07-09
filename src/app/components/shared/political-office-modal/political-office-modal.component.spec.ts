import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalOfficeModalComponent } from './political-office-modal.component';

describe('PoliticalOfficeModalComponent', () => {
  let component: PoliticalOfficeModalComponent;
  let fixture: ComponentFixture<PoliticalOfficeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticalOfficeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticalOfficeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
