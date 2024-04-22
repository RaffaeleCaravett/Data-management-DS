import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbMenuService } from '@nebular/theme';
import { OneColumnLayoutComponent } from 'app/@theme/layouts';
import { map } from 'leaflet';
import { ProgressSpinnerService } from './contratti/progress-spinner/progress-spinner.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  <ngx-progress-spinner></ngx-progress-spinner>
  <ngx-spinner 
  size="large"
  color="white"
  type="line-spin-clockwise-fade"
>
  <p style="font-size: 40px; color: white">Loading...</p>
  </ngx-spinner>
    <ngx-one-column-layout >

      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class PagesComponent{

  menu = MENU_ITEMS;
  constructor(menu: NbMenuService,private cdr:ChangeDetectorRef, private oneColumnLayoutComponent:OneColumnLayoutComponent,private spinnerService:ProgressSpinnerService) {

//  menu.onItemClick().subscribe((data:any)=>{
//  console.log(data)
//   this.spinnerService.requestStarted()
//   setTimeout(()=>{
//     this.spinnerService.requestEnded()
//   },500)

//  })

}

}
