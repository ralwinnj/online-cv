import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalMembershipModalComponent } from './professional-membership-modal.component';

describe('ProfessionalMembershipModalComponent', () => {
  let component: ProfessionalMembershipModalComponent;
  let fixture: ComponentFixture<ProfessionalMembershipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalMembershipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalMembershipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
