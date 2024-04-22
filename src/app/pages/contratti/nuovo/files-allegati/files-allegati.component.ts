import { Component, EventEmitter, Input, OnInit, Output, Type, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContrattiService } from '../../contratti.service'; import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from '../../../../shared/dialog/dialog2/dialog2.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicSizes, Errors } from 'app/shared/dialog/dialog2/dynamic-sizes';
import { tipiAllegato } from './files-allegati';
import { DettagliContratto } from '../../contratti-large';
import { ClienteService } from '../cliente/cliente.service';

@Component({
  selector: 'ngx-files-allegati',
  templateUrl: './files-allegati.component.html',
  styleUrls: ['./files-allegati.component.scss'],
  host: {
    "(document:click)": "onDocumentClicked($event)"
  }
})
export class FilesAllegatiComponent implements OnInit {
  allegatiArray: { id: number; tipologia: any; nome: any; byte: FormData; }[];
  canIDeleteFile0: boolean;
  AccettazioneTipoFornitura: number = 0
  CondizioniTecnicoEconomiche: number = 0
  DocumentoDIdentita: number = 0
  @ViewChild('select') select: any
  onDocumentClicked(ev:any) {
    if (ev.target.className == 'fa fa-times') {
      this.file0 = '';
      this.pdfSrc0 = '';
    } else if (ev.target.className == 'btn btn-success afu-upload-btn ng-star-inserted' && this.file0) {
      this.arrayToShowAllegati.push({
        tipo: this.select.nativeElement.options[this.select.nativeElement.selectedIndex].textContent, id: this.filesAllegatiForm.controls['tipoDocumento'].value, file: this.file0
      })
      this.select.nativeElement.options[this.select.nativeElement.selectedIndex].textContent=="Documento D'Identita"?this.DocumentoDIdentita=1:
      this.select.nativeElement.options[this.select.nativeElement.selectedIndex].textContent=="Accettazione Tipo Fornitura"?this.AccettazioneTipoFornitura = 1:
      this.select.nativeElement.options[this.select.nativeElement.selectedIndex].textContent=="Condizioni Tecnico Economiche"?this.CondizioniTecnicoEconomiche=1:''
      this.dataSource1 = new MatTableDataSource<any>(this.arrayToShowAllegati);
      this.file0 = ''
      this.pdfSrc0 = ''
      this.resetVar = true
      this.filesAllegatiForm.controls['tipoDocumento'].setValue(null)
      this.resetVar = false
    }
    else if (ev.target.className == 'btn btn-success afu-upload-btn ng-star-inserted' && !this.file0) {
      this.clienteService.openDialog(Errors.selectAFile,this.dialog,DynamicSizes)
    }
  }
  @Output() value = new EventEmitter<any>();
  @Output() activated = new EventEmitter<string>();
  @Output() cdContratto = new EventEmitter<string>();
  @Output() color = new EventEmitter<string>();
  @Input() codiceContratto: string;
  selezionaFile: boolean
  filesAllegatiForm: FormGroup;
  dataSource1 = new MatTableDataSource<any>();
  file0: any
  pdfSrc0: string;
  @ViewChild('fileUpload1') fileUpload1: any
  resetVar: boolean
  clickedElement: Subscription = new Subscription();
  arrayToShowAllegati:any= []
  dataSource1NotLongEnough: boolean
  tipiAllegato: tipiAllegato[]
  blockCancel: boolean
  displayedColumns1 = ['Tipo Documento', 'Nome', 'Dimensione', 'Azioni'];

  constructor(private route: Router,
    private contrattiService: ContrattiService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private clienteService:ClienteService) {
    this.spinner.show()
  }

  ngOnInit(): void {
    this.contrattiService.getTipiAllegati().subscribe((data: tipiAllegato[]) => {
      this.tipiAllegato = data
      this.blockCancel = false
      if (this.codiceContratto) {
        this.spinner.show()
        this.contrattiService.getAllegati(this.codiceContratto)
          .subscribe((data: any) => {
            if (data.length > 2) {
              for (let el of data) {
                const byteArray = new Uint8Array(atob(el.file).split('').map(char => char.charCodeAt(0)));
                const file = new Blob([byteArray], { type: 'application/pdf' });
                this.arrayToShowAllegati.push(
                  {
                    tipo: el.tipoAllegato.descrizione, id: el.tipoAllegato.id, nome: '', file: file
                  }
                )
              }
              this.dataSource1 = new MatTableDataSource<any>(this.arrayToShowAllegati);

            }
            this.contrattiService
              .getRicercaContratto(this.codiceContratto).subscribe((data: DettagliContratto) => {
                if (data.clienteResponseDto.statoContratto == 'COMPLETO') {
                  this.blockCancel = true
                  this.filesAllegatiForm.controls['tipoDocumento'].setValue('')
                  this.filesAllegatiForm.controls['tipoDocumento'].disable()
                  this.filesAllegatiForm.controls['tipoDocumento'].updateValueAndValidity()
                }
              })
          }, err => {
            this.clienteService.openDialog(Errors.qualcosaEAndatoStorto, this.dialog, DynamicSizes)
          })
      }
      setTimeout(() => {
        this.spinner.hide()
      }, 1800)

    })
    this.canIDeleteFile0 = false
    this.contrattiService.getTipiAllegati().subscribe((data:tipiAllegato[]) => {
      this.tipiAllegato = data
    })
    this.filesAllegatiForm = new FormGroup({
      tipoDocumento: new FormControl(null, Validators.required),
    });
    this.dataSource1 = new MatTableDataSource<any>(this.arrayToShowAllegati);
    this.resetVar = false
    this.value.emit(100);
  }
  check() {
    if (this.canIDeleteFile0 == true) {
      this.canIDeleteFile0 = false
      this.file0 = ''
    }
  }
  deleteFile(index:number) {
    if (this.file0) {
      if (this.file0.tipo == this.arrayToShowAllegati[index].tipo) {
        this.file0 = ''
        this.canIDeleteFile0 = false
      }
    }
      switch(this.arrayToShowAllegati[index].tipo){
         case "Documento D'Identita":
          this.DocumentoDIdentita = 0
         break;
         case "Accettazione Tipo Fornitura":
          this.AccettazioneTipoFornitura = 0
         break;
         case "Condizioni Tecnico Economiche":
          this.CondizioniTecnicoEconomiche = 0
         break;
      }
    this.arrayToShowAllegati.splice([index], 1)
    this.dataSource1 = new MatTableDataSource<any>(this.arrayToShowAllegati);
  }
  postFilesAllegati() {
    if(!this.filesAllegatiForm.controls['tipoDocumento'].disabled == true && this.AccettazioneTipoFornitura == 1 &&
     this.CondizioniTecnicoEconomiche == 1 && this.DocumentoDIdentita == 1) {
      this.dataSource1NotLongEnough = false
      let formData = new FormData();
      formData.append('codiceContratto', this.codiceContratto)
      for (let el of this.dataSource1.data) {
        formData.append(`allegatiDto[${this.dataSource1.data.indexOf(el)}].multipartFile`, el.file)
        formData.append(`allegatiDto[${this.dataSource1.data.indexOf(el)}].idTipoAllegato`, el.id)
      }
      this.spinner.show()
      this.contrattiService.postAllegati(
        formData
      ).subscribe((data: any) => {
      }, (err: any) => {
        if (err.status == 200) {
          setTimeout(() => {
            this.spinner.hide()
          }, 1000)
          setTimeout(() => {
            this.color.emit('bg-success')
            const dialogRef = this.dialog.open(Dialog2Component, {
              width: DynamicSizes.mediumWidth,
              height: DynamicSizes.mediumHeight,
            })
            dialogRef.afterClosed().subscribe(result=>{
                this.route.navigate(['contratti'])}
            );
          }, 1100)
        } else {
          const dialogRef = this.dialog.open(Dialog2Component, {
            width: DynamicSizes.mediumWidth,
            height: DynamicSizes.mediumHeight,
            data: err
          })
          dialogRef.afterClosed().subscribe(data => {
            this.spinner.hide()
          }
          );
        }
      })
      this.allegatiArray = []
    } else if (this.filesAllegatiForm.controls['tipoDocumento'].disabled == true &&
    this.AccettazioneTipoFornitura == 1 && this.CondizioniTecnicoEconomiche == 1 && this.DocumentoDIdentita == 1) {
      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide()
      }, 1000)
      this.route.navigate(['contratti'])
    } else {
      this.clienteService.openDialog(Errors.notEnoughDocuments, this.dialog, DynamicSizes)
    }
  }
  vaiIndietro() {
    this.cdContratto.emit(this.codiceContratto)
    this.activated.emit('informazioniFornitura');
  }

  uploadFile(a: any) {
    if (a.tipo) {
      if (a.nome != '') {
        this.selezionaFile = false
        this.file0 = a;
        this.pdfSrc0 = this.file0.file.name
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc0 = e.target.result;
        };
        reader.readAsArrayBuffer(a.file);
        this.fileUpload1.resetFileUpload();
      }
      if (a.nome == '') {
        this.file0 = a.file
        this.pdfSrc0 = this.file0.file
        let reader = new FileReader();
        reader.onloadend = (e: any) => {
          this.pdfSrc0 = e.target.result
        };
        reader.readAsDataURL(a.file);
      }
    } else if (a.type == 'drop') {
      this.selezionaFile = false
      this.file0 = a.dataTransfer.files[0];
      this.pdfSrc0 = this.file0.name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc0 = e.target.result;
      };
      reader.readAsArrayBuffer(a.dataTransfer.files[0]);
      this.fileUpload1.resetFileUpload();
    } else if (a.type == 'change') {
      this.selezionaFile = false
      this.file0 = a.target.files[0];
      this.pdfSrc0 = this.file0.name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc0 = e.target.result;
      };
      reader.readAsArrayBuffer(a.target.files[0]);
      this.fileUpload1.resetFileUpload();
    }
  }
  afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf",
    maxSize: "1",
    uploadAPI: {
      url: "https://example-file-upload-api",
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Seleziona file',
      resetBtn: 'Reset',
      uploadBtn: 'Carica file',
      dragNDropBox: 'Trascina qui un file',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Caricamento riuscito!',
      afterUploadMsg_error: 'Caricamento non riusciuto!',
      sizeLimit: 'Dimensione massima'
    }
  };
  //mostrare un file dalla tabella
  showFile(index: number) {
    this.canIDeleteFile0 = true
    var event = new CustomEvent('build', { detail: { 'detail1': this.dataSource1.data[index], detail2: "something else" } });
    this.uploadFile(event.detail.detail1)
  }
}
