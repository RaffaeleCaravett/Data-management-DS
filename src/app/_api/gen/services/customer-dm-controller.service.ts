/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { JwtAuthenticationRequest } from '../models/jwt-authentication-request';
import { ResetPasswordDto } from '../models/reset-password-dto';
import { ResponseWrapper } from '../models/response-wrapper';
import { UsernameDto } from '../models/username-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerDmControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation resetPassword
   */
  static readonly ResetPasswordPath = '/api/v2/public/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword$Response(params: {
    context?: HttpContext
    body: ResetPasswordDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerDmControllerService.ResetPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword(params: {
    context?: HttpContext
    body: ResetPasswordDto
  }
): Observable<void> {

    return this.resetPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/api/v2/public/login';

  /**
   * Login cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    context?: HttpContext
    body: JwtAuthenticationRequest
  }
): Observable<StrictHttpResponse<ResponseWrapper>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerDmControllerService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResponseWrapper>;
      })
    );
  }

  /**
   * Login cliente
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    context?: HttpContext
    body: JwtAuthenticationRequest
  }
): Observable<ResponseWrapper> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<ResponseWrapper>) => r.body as ResponseWrapper)
    );
  }

  /**
   * Path part for operation forgotPassword
   */
  static readonly ForgotPasswordPath = '/api/v2/public/forgotPassword';

  /**
   * Recupero password cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword$Response(params: {
    context?: HttpContext
    body: UsernameDto
  }
): Observable<StrictHttpResponse<ResponseWrapper>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerDmControllerService.ForgotPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResponseWrapper>;
      })
    );
  }

  /**
   * Recupero password cliente
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword(params: {
    context?: HttpContext
    body: UsernameDto
  }
): Observable<ResponseWrapper> {

    return this.forgotPassword$Response(params).pipe(
      map((r: StrictHttpResponse<ResponseWrapper>) => r.body as ResponseWrapper)
    );
  }

  /**
   * Path part for operation encryptAllPassword
   */
  static readonly EncryptAllPasswordPath = '/api/v2/public/encryptAllPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `encryptAllPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  encryptAllPassword$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerDmControllerService.EncryptAllPasswordPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `encryptAllPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  encryptAllPassword(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.encryptAllPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
