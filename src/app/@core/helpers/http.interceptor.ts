import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from '../services/security/storage.service';
import { ProgressSpinnerService } from 'app/pages/contratti/progress-spinner/progress-spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private accountService: StorageService,private spinnerService:ProgressSpinnerService,private spinner: NgxSpinnerService) {
 
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    console.log('Errore nell\'autentificazione')
    const account = this.accountService.getToken();
    const isApiUrl = request.url.indexOf(environment.urlContainerPrivate) > -1;

    if (account && isApiUrl) {
      request = request.clone({
        setHeaders: {'Authorization': `${account}`},
      });
    } else {
      // this.spinnerService.resetSpinner()
      this.spinner.hide();
      console.log('Errore nell\'autentificazione utente non loggato. isLoggedIn:, isApiUrl:', account, isApiUrl);
    }
    return next.handle(request);
  }
}
