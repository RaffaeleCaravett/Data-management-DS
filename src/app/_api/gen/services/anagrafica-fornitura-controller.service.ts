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

import { RestApiResponseObject } from '../models/rest-api-response-object';

@Injectable({
  providedIn: 'root',
})
export class AnagraficaFornituraControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFornitureAssociate1
   */
  static readonly GetFornitureAssociate1Path = '/api/v1/private/getFornitureAssociate/{codiceFiscale}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFornitureAssociate1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFornitureAssociate1$Response(params: {
    codiceFiscale: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, AnagraficaFornituraControllerService.GetFornitureAssociate1Path, 'get');
    if (params) {
      rb.path('codiceFiscale', params.codiceFiscale, {});
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
   * To access the full response (for headers, for example), `getFornitureAssociate1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFornitureAssociate1(params: {
    codiceFiscale: string;
    context?: HttpContext
  }
): Observable<RestApiResponseObject> {

    return this.getFornitureAssociate1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

}
