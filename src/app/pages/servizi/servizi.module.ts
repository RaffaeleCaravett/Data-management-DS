import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoLetturaComponent } from './autoLettura/auto-lettura/auto-lettura.component';
import { ServiziRoutingModule } from './servizi-routing.module';
import { ModificaIndirizzoComponent } from './modifica-indirizzo/modifica-indirizzo.component';
import { ModificaPotenzaComponent } from './modifica-potenza/modifica-potenza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiziSottomenuService } from './serivizi-sottomenu/servizi-sottomenu.service';
import { WizardComponent } from './wizard/wizard.component';
import { RiepilogoComponent } from './riepilogo/riepilogo.component';



@NgModule({
  declarations: [
    AutoLetturaComponent,
    ModificaIndirizzoComponent,
    ModificaPotenzaComponent,
    WizardComponent,
    RiepilogoComponent
  ],
  imports: [
    CommonModule,
    ServiziRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ ServiziSottomenuService
  ]
})
export class ServiziModule { }
