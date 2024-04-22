import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContrattiComponent } from './contratti.component';
import { InsertContrattiComponent } from './nuovo/insert-contratti/insert-contratti.component';

const routes: Routes = [
  {
    path: '',
    component: ContrattiComponent,
  },
  {
    path: 'visualizza/:id',
    component: InsertContrattiComponent, 
    loadChildren: () => import('./nuovo/insert-contratti/insert-contratti.module')
    .then(m => m.InsertContrattiModule),
  },
  { 
    path: 'insertContratti',
  component: InsertContrattiComponent, 
  loadChildren: () => import('./nuovo/insert-contratti/insert-contratti.module')
  .then(m => m.InsertContrattiModule),
  
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiRoutingModule { }
