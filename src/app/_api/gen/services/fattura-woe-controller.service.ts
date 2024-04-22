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

import { FatturaWoeRequest } from '../models/fattura-woe-request';
import { RestApiResponseObject } from '../models/rest-api-response-object';

@Injectable({
  providedIn: 'root',
})
export class FatturaWoeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFornitureAssociate
   */
  static readonly GetFornitureAssociatePath = '/api/v1/private/getFattureByAnagraficaEPeriodo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFornitureAssociate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getFornitureAssociate$Response(params: {
    context?: HttpContext
    body: FatturaWoeRequest
  }
): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, FatturaWoeControllerService.GetFornitureAssociatePath, 'post');
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
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFornitureAssociate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getFornitureAssociate(params: {
    context?: HttpContext
    body: FatturaWoeRequest
  }
): Observable<RestApiResponseObject> {

    return this.getFornitureAssociate$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

}
