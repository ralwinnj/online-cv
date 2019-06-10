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
  AlertModalComponent
];
