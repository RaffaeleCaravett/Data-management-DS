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

import { RestApiResponse } from '../models/rest-api-response';

@Injectable({
  providedIn: 'root',
})
export class SedeFornituraGasControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getfornituraDetails
   */
  static readonly GetfornituraDetailsPath = '/api/v1/private/getfornituraDetails/{pdr}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getfornituraDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfornituraDetails$Response(params: {
    pdr: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<RestApiResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SedeFornituraGasControllerService.GetfornituraDetailsPath, 'get');
    if (params) {
      rb.path('pdr', params.pdr, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getfornituraDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfornituraDetails(params: {
    pdr: string;
    context?: HttpContext
  }
): Observable<RestApiResponse> {

    return this.getfornituraDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponse>) => r.body as RestApiResponse)
    );
  }

}
