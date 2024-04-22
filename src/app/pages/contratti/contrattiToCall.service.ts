import { Injectable } from '@angular/core';
import { Contratti, ContrattiRoot, Paginator } from './contratti';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class ContrattiToCallService {

  constructor() {
  }

paginatorStandardsEArrays(data: ContrattiRoot,arrayFiltrato:Contratti[],arrayOriginale:Contratti[],dataSource:MatTableDataSource<Contratti>,paginator2:Paginator) {
  arrayFiltrato = data.content;
  arrayOriginale = arrayFiltrato;
  dataSource = new MatTableDataSource<any>(arrayOriginale);
  paginator2 = {
    pageable: data.pageable,
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    size: data.size,
    pageSizeOptions: [5, 10, 20],
  };
}
formValues(formContratto:FormGroup) {
  return {
    cdContratto: formContratto.controls['cdContratto'].value,
    ragioneSociale: formContratto.controls['ragioneSociale'].value,
    cdFiscale: formContratto.controls['cdFiscale'].value,
    partitaIva: formContratto.controls['partitaIva'].value,
    cdTipoCliente: formContratto.controls['tipoCliente'].value,
    idStatoContratto: formContratto.controls['statoContratto'].value,
    dataStipulaDa: formContratto.controls['dataStipulaDa'].value,
    dataStipulaA: formContratto.controls['dataStipulaA'].value,
  }
}
}
