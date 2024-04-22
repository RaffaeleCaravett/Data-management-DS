import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertContrattiRoutingModule } from './insert-contratti-routing.module';
import { InsertContrattiComponent } from './insert-contratti.component';
import { NavComponent } from '../nav/nav.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InformazioniFornituraComponent } from '../informazioni-fornitura/informazioni-fornitura.component';
import { FilesAllegatiComponent } from '../files-allegati/files-allegati.component';
import { MatTableModule } from '@angular/material/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UploaderModule } from "angular-uploader";
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    InsertContrattiComponent,
    NavComponent,
    ClienteComponent,
    PagamentoComponent,
    InformazioniFornituraComponent,
    FilesAllegatiComponent,
    
   

  ],
  imports: [
    CommonModule,
    InsertContrattiRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    AngularFileUploaderModule,
    PdfViewerModule,
    UploaderModule,
    SharedModule




  ]
})


export class InsertContrattiModule{






}
