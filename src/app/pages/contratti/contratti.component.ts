import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContrattiService } from './contratti.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from '../../shared/dialog/dialog2/dialog2.component';
import { DynamicSizes } from 'app/shared/dialog/dialog2/dynamic-sizes';
import { Contratti, ContrattiRoot, Paginator, StatiContratto, TipiCliente } from './contratti';
import { ContrattiToCallService } from './contrattiToCall.service';

@Component({
  selector: 'ngx-contratti',
  templateUrl: './contratti.component.html',
  styleUrls: ['./contratti.component.scss'],
})
export class ContrattiComponent implements OnInit {
  arrayFiltrato: Contratti[];
  arrayOriginale: Contratti[];
  formContratto: FormGroup;
  size: number;
  page: number;
  displayedColumns: string[];
  paginator2: Paginator = { pageable: 0, totalElements: 0, totalPages: 0, size: 0, pageSizeOptions: [0] };
  dataSource = new MatTableDataSource<Contratti>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  optionsArray: TipiCliente[];
  statiContratto: StatiContratto[]
  constructor(
    private contrattiService: ContrattiService,
    public dialog: MatDialog,
    private router: Router,
    private contrattiToCallService:ContrattiToCallService
  ) { }

  ngOnInit(): void {

    this.formContratto = new FormGroup({
      cdContratto: new FormControl(),
      ragioneSociale: new FormControl(),
      cdFiscale: new FormControl(),
      partitaIva: new FormControl(),
      tipoCliente: new FormControl(),
      statoContratto: new FormControl(),
      dataStipulaDa: new FormControl(),
      dataStipulaA: new FormControl(),
    });
    this.displayedColumns = [
      'Codice Contratto',
      'Tipo Fornitura',
      'Data Stipula',
      'Tipo Cliente',
      'Ragione Sociale',
      'Codice Fiscale',
      'Partita Iva',
      'Stato Contratto',
      'view Contratto',
    ]
    this.contrattiService.getTipiCliente().subscribe((data: TipiCliente[]) => {
      this.optionsArray = data;
    });
    this.size = 10;
    this.page = 1;
    this.paginator2.pageSizeOptions = [10, 20];
    this.contrattiService.getStatiContract().subscribe((data:StatiContratto[]) => {
      if (data) {
        this.statiContratto = data
      }
    })

    this.contrattiService.getContratti(this.size, this.page, this.contrattiToCallService.formValues(this.formContratto)).subscribe((data: ContrattiRoot) => {
      this.paginatorStandardsEArrays(data)
    });
  }
  passContrattoStato(a: string, cdContratto:string) {
    this.router.navigate(['./contratti/visualizza/' + cdContratto]);
  }
  onSubmit() {
    this.size = this.paginator.pageSize;
    this.page = 1;
    if (
      this.formContratto.controls['dataStipulaDa'].value >
      this.formContratto.controls['dataStipulaA'].value
    ) {
      let err = { error: { message: 'Le date che stai inserendo non vanno bene' } }
      const dialogRef = this.dialog.open(Dialog2Component, {
        width: DynamicSizes.mediumWidth,
        height: DynamicSizes.mediumHeight,
        data: err.error.message
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.formContratto.controls['dataStipulaDa'].setValue(null);
        this.formContratto.controls['dataStipulaA'].setValue(null);
      });
    } else if (
      !this.formContratto.invalid &&
      this.formContratto.controls['dataStipulaDa'].value &&
      !this.formContratto.controls['dataStipulaA'].value
    ) {
      let err = { error: { message: 'manca una data' } }
      const dialogRef = this.dialog.open(Dialog2Component, {
        width: DynamicSizes.mediumWidth,
        height: DynamicSizes.mediumHeight,
        data: err.error.message,
      });
      dialogRef.afterClosed().subscribe((result:Date) => {
        if (result) {
          this.formContratto.controls['dataStipulaA'].setValue(result);
        }
      });
      this.size = this.paginator2.size;
      this.contrattiService.getContratti(this.size, this.page, this.contrattiToCallService.formValues(this.formContratto)).subscribe((data: ContrattiRoot) => {
        if (data) {
          this.arrayFiltrato = data.content;
          this.arrayOriginale = this.arrayFiltrato;
        }
      });
    } else if (
      !this.formContratto.invalid &&
      !this.formContratto.controls['dataStipulaDa'].value &&
      this.formContratto.controls['dataStipulaA'].value
    ) {
      let err = { error: { message: 'manca una data' } }
      const dialogRef = this.dialog.open(Dialog2Component, {
        data: err.error.message,
        width: DynamicSizes.mediumWidth,
        height: DynamicSizes.mediumHeight,
      });
      dialogRef.afterClosed().subscribe((result:Date) => {
        if (result) {
          this.formContratto.controls['dataStipulaDa'].setValue(result);
        }
      });
      this.size = this.paginator2.size;
      this.contrattiService.getContratti(this.size, this.page, this.contrattiToCallService.formValues(this.formContratto)).subscribe((data:ContrattiRoot) => {
        if (data) {
          this.arrayFiltrato = data.content;
          this.arrayOriginale = this.arrayFiltrato;
        }
      });
    }
    else {
      this.contrattiService.getContratti(this.size, this.page, this.contrattiToCallService.formValues(this.formContratto)).subscribe((data: ContrattiRoot) => {
        if (data) {
          this.paginatorStandardsEArrays(data)
        }
      });
    }
  }

  onSubmit1(a: any) {
    this.size = a.pageSize;
    this.page = a.pageIndex + 1;
    if (!this.formContratto.invalid) {
      this.contrattiService.getContratti(this.size, this.page, this.contrattiToCallService.formValues(this.formContratto)).subscribe((data: ContrattiRoot) => {
        this.paginatorStandardsEArrays(data)
      });
    } else {
      this.size = this.paginator2.size;
      this.contrattiService
        .getContratti(this.size, this.page, {
          cdContratto: '',
          ragioneSociale: '',
          cdFiscale: '',
          partitaIva: '',
          cdTipoCliente: '',
          idStatoContratto: '',
          dataStipulaDa: '',
          dataStipulaA: '',
        })
        .subscribe((data: ContrattiRoot) => {
          this.arrayFiltrato = data.content;
          this.arrayOriginale = this.arrayFiltrato;
        });
    }
  }
  goContratti() {
    this.router.navigate(['/contratti/insertContratti']);
  }
  annulla() {
    this.formContratto.reset();
    this.dataSource = new MatTableDataSource<any>([]);
    this.paginator2 = {
      pageable: 0,
      totalElements: 0,
      totalPages: 0,
      size: 0,
      pageSizeOptions: [10, 20],
    };
  }
  paginatorStandardsEArrays(data: ContrattiRoot) {
    this.arrayFiltrato = data.content;
    this.arrayOriginale = this.arrayFiltrato;
    this.dataSource = new MatTableDataSource<any>(this.arrayOriginale);
    this.paginator2 = {
      pageable: data.pageable,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      size: data.size,
      pageSizeOptions: [5, 10, 20],
    };
  }
}
