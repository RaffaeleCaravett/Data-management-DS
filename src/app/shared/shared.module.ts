import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablePagerComponent } from 'app/pages/home/paginatore';
import { MaterialModule } from 'material-module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderService } from './services/loader.service';
import { Dialog2Component } from './dialog/dialog2/dialog2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedIndirizzoComponent } from './components/shared-indirizzo/shared-indirizzo.component';
import { CoincideClientePagamentoComponent } from './components/coincide-cliente-pagamento/coincide-cliente-pagamento.component';
import { InformazioniAggiuntiveComponent } from './components/informazioni-aggiuntive/informazioni-aggiuntive.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';




@NgModule({
  declarations: [
    DataTablePagerComponent,
    Dialog2Component,
    SharedIndirizzoComponent,
    CoincideClientePagamentoComponent,
    InformazioniAggiuntiveComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MaterialModule,
    MatTableModule,
    MatDialogModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
  ],
  exports:[
    DataTablePagerComponent,
    NgxDatatableModule,
    Dialog2Component,
    SharedIndirizzoComponent,
    CoincideClientePagamentoComponent,
    InformazioniAggiuntiveComponent
  ],
  providers: [ LoaderService
  ]
})
export class SharedModule {
}
