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

import { ConsumoResponse } from '../models/consumo-response';
import { DashBoardMessageDto } from '../models/dash-board-message-dto';
import { FattureNonPagateDto } from '../models/fatture-non-pagate-dto';
import { PeriodoDto } from '../models/periodo-dto';
import { UltimaFatturaDto } from '../models/ultima-fattura-dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUltimiConsumi
   */
  static readonly GetUltimiConsumiPath = '/api/v2/private/getUltimiConsumi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUltimiConsumi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUltimiConsumi$Response(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<StrictHttpResponse<Array<ConsumoResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetUltimiConsumiPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ConsumoResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUltimiConsumi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUltimiConsumi(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<Array<ConsumoResponse>> {

    return this.getUltimiConsumi$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ConsumoResponse>>) => r.body as Array<ConsumoResponse>)
    );
  }

  /**
   * Path part for operation getUltimeFatture
   */
  static readonly GetUltimeFatturePath = '/api/v2/private/getUltimeFatture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUltimeFatture()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUltimeFatture$Response(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<StrictHttpResponse<Array<UltimaFatturaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetUltimeFatturePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UltimaFatturaDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUltimeFatture$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getUltimeFatture(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<Array<UltimaFatturaDto>> {

    return this.getUltimeFatture$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UltimaFatturaDto>>) => r.body as Array<UltimaFatturaDto>)
    );
  }

  /**
   * Path part for operation getFattureNonPagate
   */
  static readonly GetFattureNonPagatePath = '/api/v2/private/getFattureNonPagate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFattureNonPagate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getFattureNonPagate$Response(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<StrictHttpResponse<Array<FattureNonPagateDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetFattureNonPagatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FattureNonPagateDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFattureNonPagate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getFattureNonPagate(params: {
    context?: HttpContext
    body: PeriodoDto
  }
): Observable<Array<FattureNonPagateDto>> {

    return this.getFattureNonPagate$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FattureNonPagateDto>>) => r.body as Array<FattureNonPagateDto>)
    );
  }

  /**
   * Path part for operation getDashboardMessage
   */
  static readonly GetDashboardMessagePath = '/api/v2/private/getDashboardMessage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDashboardMessage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDashboardMessage$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DashBoardMessageDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetDashboardMessagePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DashBoardMessageDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDashboardMessage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDashboardMessage(params?: {
    context?: HttpContext
  }
): Observable<Array<DashBoardMessageDto>> {

    return this.getDashboardMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DashBoardMessageDto>>) => r.body as Array<DashBoardMessageDto>)
    );
  }

}
