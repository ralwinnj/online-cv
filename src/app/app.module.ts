import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, AppModuleList } from './app-routing.module';

import { NgbModalModule, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';

import { ApiService } from './shared/api.service';
import { EncrDecrService } from './shared/encr-decr.service';

import { AlertModalComponent } from './components/shared/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AppModuleList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbAlertModule
  ],
  providers: [
    ApiService,
    EncrDecrService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertModalComponent]
})
export class AppModule { }
