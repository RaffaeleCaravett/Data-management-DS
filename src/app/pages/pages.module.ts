import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {HomeModule} from './home/home.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ServiziComponent } from './servizi/servizi.component';
import { ContrattiComponent } from './contratti/contratti.component';
import { SharedModule } from 'app/shared/shared.module';
import { OneColumnLayoutComponent } from 'app/@theme/layouts';
import { ProgressSpinnerComponent } from './contratti/progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerComponent, NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  declarations: [
    PagesComponent,
    ServiziComponent,
    ProgressSpinnerComponent,
      
  ],
  providers:[
    OneColumnLayoutComponent,
    PagesComponent
  ]
})
export class PagesModule {
}
