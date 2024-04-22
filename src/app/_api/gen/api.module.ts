/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CustomerDmControllerService } from './services/customer-dm-controller.service';
import { DashboardControllerService } from './services/dashboard-controller.service';
import { FatturaWoeControllerService } from './services/fattura-woe-controller.service';
import { PublicControllerService } from './services/public-controller.service';
import { SedeFornituraGasControllerService } from './services/sede-fornitura-gas-controller.service';
import { AnagraficaFornituraControllerService } from './services/anagrafica-fornitura-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CustomerDmControllerService,
    DashboardControllerService,
    FatturaWoeControllerService,
    PublicControllerService,
    SedeFornituraGasControllerService,
    AnagraficaFornituraControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
