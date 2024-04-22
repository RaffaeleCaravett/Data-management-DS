/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {ErrorService} from './@core/services/error.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private toastr: ToastrService,
              translate: TranslateService,
              private errorService: ErrorService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('it');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('it');
  }

  ngOnInit(): void {
    this.initializeErrors();
  }

  private initializeErrors() {
    this.errorService.getError().subscribe((errors: any) => {
      if (errors) {
        this.showToast('Attenzione! errore: ' + errors.code, errors.message);
      } else if (errors && errors instanceof Blob) {
        const fr = new FileReader();


        fr.addEventListener('loadend', (e: any) => {
          if (e.currentTarget?.result) {
            const error = JSON.parse(e.currentTarget?.result);
            this.showToast('Attenzione! errore: ' + error.errorCode, error.message);
          }
        });
        fr.readAsText(errors);
      }
    });
  }

  private showToast(title: string, body: string) {
    this.toastr.error('<span class="dmErrorMessage">' + body + '</span>', title
      , {enableHtml: true, extendedTimeOut: 5000});
  }
}
