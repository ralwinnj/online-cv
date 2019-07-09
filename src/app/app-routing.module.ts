import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantFormComponent } from './components/applicant-form/applicant-form.component';
import { ApplicantListComponent } from './components/applicant-list/applicant-list.component';
import { ApplicantViewComponent } from './components/applicant-view/applicant-view.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ThankYouComponent } from './components/shared/thank-you/thank-you.component';
import { AlertModalComponent } from './components/shared/alert-modal/alert-modal.component';
import { ComputerLiteracyModalComponent } from './components/shared/computer-literacy-modal/computer-literacy-modal.component';
import { GeneralModalComponent } from './components/shared/general-modal/general-modal.component';
import { CriminalRecordModalComponent } from './components/shared/criminal-record-modal/criminal-record-modal.component';
import { DisciplinaryRecordModalComponent } from './components/shared/disciplinary-record-modal/disciplinary-record-modal.component';
import { ExperienceModalComponent } from './components/shared/experience-modal/experience-modal.component';
import { PoliticalOfficeModalComponent } from './components/shared/political-office-modal/political-office-modal.component';
import { ProfessionalMembershipModalComponent } from './components/shared/professional-membership-modal/professional-membership-modal.component';
import { QualificationModalComponent } from './components/shared/qualification-modal/qualification-modal.component';
import { ReferenceModalComponent } from './components/shared/reference-modal/reference-modal.component';
import { MapsSearchComponent } from './components/shared/maps-search/maps-search.component';

const routes: Routes = [
  {
    path: 'applicant-form',
    component: ApplicantFormComponent,
    data: {
      email: 'test@mail.com'
    }
  },
  {
    path: 'applicant-list',
    component: ApplicantListComponent
  },
  {
    // path: 'applicant-view/:id',
    path: 'applicant-view',
    component: ApplicantViewComponent
  },
  {
    path: 'signup',
    component: CreateAccountComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppModuleList = [
  ApplicantViewComponent,
  ApplicantListComponent,
  ApplicantFormComponent,
  LoginComponent,
  LoaderComponent,
  PageNotFoundComponent,
  CreateAccountComponent,
  ThankYouComponent,
  MapsSearchComponent,
  AlertModalComponent,
  ComputerLiteracyModalComponent,
  GeneralModalComponent,
  CriminalRecordModalComponent,
  DisciplinaryRecordModalComponent,
  ExperienceModalComponent,
  PoliticalOfficeModalComponent,
  ProfessionalMembershipModalComponent,
  QualificationModalComponent,
  ReferenceModalComponent
];
export const AppModals = [
  AlertModalComponent,
  ComputerLiteracyModalComponent,
  GeneralModalComponent,
  CriminalRecordModalComponent,
  DisciplinaryRecordModalComponent,
  ExperienceModalComponent,
  PoliticalOfficeModalComponent,
  ProfessionalMembershipModalComponent,
  QualificationModalComponent,
  ReferenceModalComponent
]

