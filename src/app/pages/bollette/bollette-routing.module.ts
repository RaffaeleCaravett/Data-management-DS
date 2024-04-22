import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BolletteComponent } from './bollette.component';
import { VisualizzaBolletteComponent } from './components/visualizza-bollette/visualizza-bollette.component';



const routes: Routes = [
  {
    path: '',
    component: BolletteComponent,
  },
  {
    path: 'visualizza/:id',
    component: VisualizzaBolletteComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolletteRoutingModule {
}
