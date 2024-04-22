import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiziComponent } from './servizi.component';
import { AutoLetturaComponent } from './autoLettura/auto-lettura/auto-lettura.component';
import { ModificaIndirizzoComponent } from './modifica-indirizzo/modifica-indirizzo.component';
import { ModificaPotenzaComponent } from './modifica-potenza/modifica-potenza.component';



const routes: Routes = [
  {
    path: '',
    component: ServiziComponent,
  },
  {
    path: 'autolettura',
    component: AutoLetturaComponent,
  },
  {
    path: 'editIndirizzo',
    component: ModificaIndirizzoComponent,
  },
  {
    path: 'editPotenza',
    component: ModificaPotenzaComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiziRoutingModule {

}
