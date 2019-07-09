import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerLiteracyModalComponent } from './computer-literacy-modal.component';

describe('ComputerLiteracyModalComponent', () => {
  let component: ComputerLiteracyModalComponent;
  let fixture: ComponentFixture<ComputerLiteracyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerLiteracyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerLiteracyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
