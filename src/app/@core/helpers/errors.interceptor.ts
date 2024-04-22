import { Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { ErrorWrapper } from "../../shared/models/error-wrapper";
import { ProgressSpinnerService } from 'app/pages/contratti/progress-spinner/progress-spinner.service';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor,OnInit{


  constructor(private errorService: ErrorService,private spinnerService:ProgressSpinnerService,private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Passed through the interceptor in request');
  //  this.proSpinCom.showSpinner

// this.spinnerService.requestStarted()
this.spinner.show();
    return  next.handle(request)

      .pipe(

        map(res => {
        
         if(res instanceof HttpResponse){
          // this.spinnerService.requestEnded()
          setTimeout(()=>{
  this.spinner.hide();
          },1000)
        
          }
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          let errorMsg;
          // this.spinnerService.resetSpinner()
          setTimeout(()=>{
this.spinner.hide();
          },1000)
          
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.status) {
              let errorInfo;
              if (error.status >= 400 && error.status < 500) {
                switch (error.status) {
                  case 404:
                    errorInfo = new ErrorWrapper();
                    errorInfo.code = '404';
                    errorInfo.result = 'Not Found';
                    break;
                  default:
                    errorInfo = error.error;
                    break;
                }
              }
              this.errorService.addErrors(errorInfo);
              return throwError(error);

            }
          }
          console.log(errorMsg);

          // this.spinnerService.resetSpinner()
          setTimeout(()=>{
  this.spinner.hide();
          },1000)
        
          return throwError(errorMsg);
        }));
  }

}
