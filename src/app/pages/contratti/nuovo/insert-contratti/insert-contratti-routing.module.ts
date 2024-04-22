import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertContrattiComponent } from './insert-contratti.component';

const routes: Routes = [
  { path: '', component: InsertContrattiComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertContrattiRoutingModule { }
