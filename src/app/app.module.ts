import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxResponsiveStackTableModule } from 'ngx-responsive-stack-table';

import { AppRoutingModule, AppModuleList, AppModals } from './app-routing.module';

import { NgbModalModule, NgbDatepickerModule, NgbAlertModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';

import { ApiService } from './shared/api.service';
import { EncrDecrService } from './shared/encr-decr.service';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppModuleList,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxResponsiveStackTableModule,
    // NgbTooltip,
    NgbModalModule,
    NgbDatepickerModule,
    NgbAlertModule,
  ],
  providers: [
    ApiService,
    EncrDecrService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppModals
  ]
})
export class AppModule { }
