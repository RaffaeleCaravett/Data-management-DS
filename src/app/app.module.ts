import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbToastrModule,
  NbToastrService,
  NbWindowModule,
} from '@nebular/theme';
import {HttpRequestInterceptor} from './@core/helpers/http.interceptor';
import {ErrorInterceptor} from './@core/helpers/errors.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {environment} from '../environments/environment';
import {ApiModule} from './_api/gen/api.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../material-module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

// AoT requires an exported function for factories
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ToastrModule.forRoot(),
    CoreModule.forRoot(),
    NbSelectModule,
    ThemeModule.forRoot(),
    ApiModule.forRoot({rootUrl: environment.API_URL}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
 Ng2SmartTableModule,
ReactiveFormsModule,
    SharedModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    NbToastrService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],

})
export class AppModule {
}
