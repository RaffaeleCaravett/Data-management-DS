import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {AuthGuardService} from '../@core/services/security/auth-guard.service';
import { ServiziModule } from './servizi/servizi.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module')
          .then(m => m.HomeModule),
      },
      {
        path: 'bollette',
        loadChildren: () => import('./bollette/bollette.module')
          .then(m => m.BolletteModule),
      },
      {
        path: 'servizi',
        loadChildren: () => import('./servizi/servizi.module')
          .then(m => m.ServiziModule),
      },
      { 
        path: 'contratti', 
        loadChildren: () => import('./contratti/contratti.module')
          .then(m => m.ContrattiModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule),
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
