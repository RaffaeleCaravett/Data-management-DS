import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerDmControllerService} from '@gen/services/customer-dm-controller.service';
import {JwtAuthenticationRequest} from '@gen/models/jwt-authentication-request';
import {StorageService} from './storage.service';
import {ResetPasswordDto} from '@gen/models/reset-password-dto';
import {environment} from 'environments/environment';
import {ResponseWrapper} from '@gen/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private customerDmService: CustomerDmControllerService,
              private http: HttpClient, private storage: StorageService) {
  }



getVersionNumber(){
  return environment.versionNumber
}

  login(username: string, password: string): Observable<any> {
    const login: JwtAuthenticationRequest = {
      username,
      password,
    };
/*    return this.http.post<any>(environment.apiUrlPublicV2 + "/login", login, {
      headers: {
        responseType: 'text',
        accept: 'application/json',
      }
    });*/

    const headers = new HttpHeaders().set('Content-Type', 'text/html');
    // @ts-ignore
    return this.http.post(environment.apiUrlPublicV2 + "/login", login,
      {  responseType: 'text'});
  }
    // return this.customerDmService.login({ body: login });
  //}

  forgotPassword(email: any): Observable<ResponseWrapper> {
    return this.customerDmService.forgotPassword({body: email});
  }

  resetPassword(item: ResetPasswordDto): Observable<void> {
    return this.http.post<any>(environment.apiUrlPublicV2 + "/resetPassword", item);
    //return this.customerDmService.resetPassword({body: item});
  }

  logout(): void {
    this.storage.clean();
  }
}
