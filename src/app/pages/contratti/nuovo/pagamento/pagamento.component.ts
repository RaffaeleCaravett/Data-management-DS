import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';
import { ContrattiService } from '../../contratti.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from '../../../../shared/dialog/dialog2/dialog2.component';
import { DynamicSizes } from 'app/shared/dialog/dialog2/dynamic-sizes';
import { AnagraficaCliente, Comuni, Provincie, Toponimi } from '../cliente/cliente';
import { TipiInvio, TipiPagamento } from './pagamento';
import { AnagraficaClienteRicerca, DettagliContratto, indirizzoResidenza } from '../../contratti-large';

@Component({
  selector: 'ngx-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  pagamentoForm: FormGroup;
  provincie: Provincie[];
  toponimi: Toponimi[];
  comuneElenco1: Comuni[];
  tipiPagamento: TipiPagamento;
  tipiInvio: TipiInvio;
  readO: boolean = false;
  readOi: boolean = false;
  org: boolean = false
  @Output() value = new EventEmitter<any>();
  @Output() activated = new EventEmitter<string>();
  @Output() cdContratto = new EventEmitter<string>();
  @Input() codiceContratto: string;
  pagamentoResponse: boolean = false
  dataIndirizzo:{}
  forCssClasses:{
    toponimo:boolean,indirizzo:boolean,
    cap:boolean,provincia:boolean,comune:boolean,
    presso:boolean,frazione:boolean,numeroCivico:boolean,
    codiceFiscale:boolean,nome:boolean,
    cognome:boolean,iban:boolean,
    submitted?:boolean
  }
  constructor(
    private serviziSottomenuService: ServiziSottomenuService,
    private cdr: ChangeDetectorRef,
    private contrattiService: ContrattiService,
    public dialog: MatDialog,
    private formBuilder:FormBuilder
  ) { }

  //onInit che se ha un codiceContratto che arriva dal Padre 'insertContratti' avvia una ricerca e riempe automaticamente i campi input a seconda se i dati ci siano o no,
  //e disabilita il form se valido

  ngOnInit(): void {
    this.getInitialValues()
    this.pagamentoForm = this.formBuilder.group({
      coincide: new FormControl(),
      cdToponimo: new FormControl(null, Validators.required),
      indirizzo: new FormControl(null, Validators.required),
      numeroCivico: new FormControl(null, Validators.required),
      cdProvincia: new FormControl(null, Validators.required),
      cdComune: new FormControl(null, Validators.required),
      cap: new FormControl(null, Validators.required),
      presso: new FormControl(),
      frazione: new FormControl(),
      modalitaSpedizioneFattura: this.formBuilder.group({
        tipoInvio: new FormControl(null, Validators.required),
        indirizzoEmail: new FormControl(),
      }),
      modalitaPagamento:this.formBuilder.group({
        tipoPagamento: new FormControl(null, Validators.required),
      }),
      coincideConCliente: this.formBuilder.group({
        coincideCliente: new FormControl(),
        codiceFiscale: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'),]),
        nome: new FormControl(null, Validators.required),
        cognome: new FormControl(null, Validators.required),
        iban: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1}[0-9]{22}$'),]),
      }),
    });
    this.codiceContratto !== '' || this.codiceContratto !== undefined ? this.contrattiService.getRicercaContratto(this.codiceContratto).subscribe((data: DettagliContratto) => {
      if (data.pagamentoResponseDto) {
        this.dataIndirizzo={data:data.pagamentoResponseDto.indirizzoFatturazione,dataCoincide:data.pagamentoResponseDto,
          stato:data.clienteResponseDto.statoContratto,dataTipoCliente:data.clienteResponseDto.tipoCliente.cdTipoCliente}
        this.pagamentoResponse = true
        this.pagamentoForm = new FormGroup({
          coincide: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.isCopyOfResidenza),
          cdToponimo: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.toponimo.cdToponimo),
          indirizzo: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.indirizzo),
          numeroCivico: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.numeroCivico),
          cdProvincia: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.provincia.cdProvincia),
          cdComune: new FormControl(),
          cap: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.cap),
          presso: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.presso),
          frazione: new FormControl(data.pagamentoResponseDto.indirizzoFatturazione.frazione),
          modalitaSpedizioneFattura: new FormGroup({
            tipoInvio: new FormControl(data.pagamentoResponseDto.tipoInvio.cdTipoInvio),
            indirizzoEmail: new FormControl(data.pagamentoResponseDto.email || ''),
          }),
          modalitaPagamento: new FormGroup({
            tipoPagamento: new FormControl(data.pagamentoResponseDto.tipoPagamento.cdTipoPagamento),
          }),
          coincideConCliente: new FormGroup({
            coincideCliente: new FormControl(data.pagamentoResponseDto.isCopyOfAnagrafica),
            codiceFiscale: new FormControl(data.pagamentoResponseDto.codiceFiscale),
            nome: new FormControl(data.pagamentoResponseDto.nome),
            cognome: new FormControl(data.pagamentoResponseDto.cognome),
            iban: new FormControl(data.pagamentoResponseDto.iban),
          }),
        });
        this.takeComuni(data.pagamentoResponseDto.indirizzoFatturazione, data)

      }else{
        this.dataIndirizzo={data:'',dataCoincide:'',
          stato:data.clienteResponseDto.statoContratto,dataTipoCliente:data.clienteResponseDto.tipoCliente.cdTipoCliente}
      }
      data.clienteResponseDto.tipoCliente.cdTipoCliente == 'ORG' ? this.org = true : this.org = false
      if(this.org==true){
        this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').clearValidators()
        this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').updateValueAndValidity()
        this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').addValidators([Validators.required,Validators.pattern('^[0-9]{11}$')])
        this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').updateValueAndValidity()
}
    })
      : '';
    this.value.emit(50);
  }

  visualizzaComuni1(selectCodice: any) {
    const codiceComune = selectCodice.target.value;
    if (codiceComune && codiceComune != '') {
      this.serviziSottomenuService.visualizzaComuni(codiceComune).subscribe((payload: Comuni[]) => {
        if (payload) {
          this.comuneElenco1 = payload;
        }
      });
    }
  }

  visualizzaCap(codiceComune: any) {
    const codice = codiceComune.target.value;
    const comune = this.comuneElenco1.find((comune) => comune.codiceComune == codice);
    this.pagamentoForm.controls['cap'].setValue(comune.cap);
    this.cdr.markForCheck();
  }

  //funzione per riempire o svuotare input appartenenti a (residenzaOSedeLegale)
  coincideResidenza() {
    this.comuneElenco1 = []
    if (this.pagamentoForm.controls['coincide'].value) {
      this.contrattiService.getIndirizzoResidenza(this.codiceContratto).subscribe((data: indirizzoResidenza) => {
        this.pagamentoForm.patchValue({
          cdToponimo: data.toponimo.cdToponimo, indirizzo: data.indirizzo, numeroCivico: data.numeroCivico,
          cdProvincia: data.provincia.cdProvincia, cap: data.toponimo.cdToponimo, presso: data.presso, frazione: data.frazione
        });
        this.pagamentoForm.controls['cdToponimo'].disable();
        this.pagamentoForm.controls['indirizzo'].disable();
        this.takeComuni(data)
        this.readO = true;
        this.pagamentoForm.controls['cdProvincia'].disable(); this.pagamentoForm.controls['cdComune'].disable();
      });
    } else {
      this.pagamentoForm.patchValue({
        cdToponimo: null, indirizzo: null, numeroCivico: null, cdProvincia: null,
        cdComune: null, cap: null, presso: null, frazione: null
      });
      this.pagamentoForm.controls['cdToponimo'].enable();
      this.pagamentoForm.controls['indirizzo'].enable();
      this.pagamentoForm.controls['cdProvincia'].enable();
      this.pagamentoForm.controls['cdComune'].enable();
      this.readO = false;
    }
    this.pagamentoForm.updateValueAndValidity()
  }

  updateValidators(a: string) {
    if (a == 'C') {
      this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').clearValidators();
    } else if (a == 'E' || a == 'T') {
      this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').addValidators([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/),]);
    } else {
      this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').clearValidators();
      this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').addValidators([Validators.required, Validators.minLength(7), Validators.maxLength(7),]);
    }
    this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').updateValueAndValidity();
  }

  //funzione di richiamo nella funzione del submit per inserire il pagamento
  inserisciPagamento() {
    if (this.pagamentoForm.controls['coincide'].value) {
      this.contrattiService.getIndirizzoResidenza(this.codiceContratto).subscribe((data: indirizzoResidenza) => {
        this.pagamentoForm.controls['cdToponimo'].setValue(data.toponimo.cdToponimo);
        this.pagamentoForm.controls['indirizzo'].setValue(data.indirizzo);
        this.pagamentoForm.controls['cdProvincia'].setValue(data.provincia.cdProvincia);
        this.serviziSottomenuService.visualizzaComuni(data.provincia.cdProvincia).subscribe((payload: Comuni[]) => {
          if (payload) {
            this.comuneElenco1 = payload;
            this.pagamentoForm.controls['cdComune'].setValue(data.comune.cdComune);
            this.pagamentoForm.updateValueAndValidity();
          }
        });
      });
    }
    this.pagamentoResponse == false ? this.contrattiService.postDatiPagamento({
      cdContratto: this.codiceContratto,
      codiceFiscaleIntestatarioCc: this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').value,
      nomeIntestatarioCc: this.pagamentoForm.controls['coincideConCliente'].get('nome').value,
      cognomeIntestatarioCc: this.pagamentoForm.controls['coincideConCliente'].get('cognome').value,
      iban: this.pagamentoForm.controls['coincideConCliente'].get('iban').value,
      emailFatturazione: this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('indirizzoEmail').value || 'Carta',
      cdTipoInvio: this.pagamentoForm.controls['modalitaSpedizioneFattura'].get('tipoInvio').value,
      cdTipoPagamento: this.pagamentoForm.controls['modalitaPagamento'].get('tipoPagamento').value,
      indirizzoFatturazione: {
        cdToponimo: this.pagamentoForm.controls['cdToponimo'].value,
        indirizzo: this.pagamentoForm.controls['indirizzo'].value,
        numeroCivico: this.pagamentoForm.controls['numeroCivico'].value,
        cap: this.pagamentoForm.controls['cap'].value,
        cdComune: this.pagamentoForm.controls['cdComune'].value,
        cdProvincia: this.pagamentoForm.controls['cdProvincia'].value,
        frazione: this.pagamentoForm.controls['frazione'].value || '',
        presso: this.pagamentoForm.controls['presso'].value || '',
        isCopyOfResidenza: this.pagamentoForm.controls['coincide'].value
      },
      isCopyOfAnagrafica: this.pagamentoForm.controls['coincideConCliente'].get('coincideCliente').value
    }).subscribe(
        (data: any) => {
          this.vaiAInformazioniFornitura();
        },
        (err: any) => {

          const dialogRef = this.dialog.open(Dialog2Component, {
            data: err,
            width: DynamicSizes.mediumWidth,
            height: DynamicSizes.mediumHeight,
          })
          dialogRef.afterClosed().subscribe((result) => {  this.sendValidityInformations()});
        }
      ) : this.vaiAInformazioniFornitura()
  }

  //funzione che emette un avento per andare a 'cliente'
  vaiIndietro() {
    this.cdContratto.emit(this.codiceContratto);
    this.activated.emit('cliente');
  }

  //funzione che emette un avento per andare a 'informazioniFornitura'
  vaiAInformazioniFornitura() {
    this.activated.emit('informazioniFornitura');
  }

  //funzione che avviene al submit del form 'pagamentoForm'
  inviaPagamento() {
    if (this.pagamentoForm.disabled) {
      this.vaiAInformazioniFornitura();
    } else if (this.pagamentoForm.valid) {
      this.inserisciPagamento();
    }else{
      this.sendValidityInformations()
    }
  }

  setPagamentoFormValue(data?: AnagraficaCliente) {
    if (data != null) {
      this.pagamentoForm.controls['coincideConCliente'].patchValue({
        codiceFiscale: data.codiceFiscale, nome: data.nome, cognome: data.cognome,
      })
      this.readOi = true;
    }
    else {
      this.pagamentoForm.controls['coincideConCliente'].patchValue({
        codiceFiscale: null, nome: null, cognome: null
      })
      this.readOi = false;
    }
  }
  takeComuni(a: any, b?: any) {
    this.serviziSottomenuService.visualizzaComuni(a.provincia.cdProvincia).subscribe((payload: Comuni[]) => {
      if (payload) {
        this.comuneElenco1 = payload;
        this.pagamentoForm.controls['cdComune'].setValue(a.comune.cdComune);
        b.clienteResponseDto.statoContratto == 'COMPLETO' ? this.pagamentoForm.disable() : ''
      }
    });
  }

  getInitialValues() {
    this.contrattiService.getTipiPagamento().subscribe((data: any) => {
      this.tipiPagamento = data;
    });
    this.contrattiService.getTipiInvio().subscribe((data: any) => {
      this.tipiInvio = data;
    });
    this.serviziSottomenuService.visualizzaProvincia1().subscribe((payload: any) => {
      if (payload) {
        this.provincie = payload;
      }
    });
    this.serviziSottomenuService.visualizzaToponimo1().subscribe((payload: any) => {
      if (payload) {
        this.toponimi = payload;
      }
    });
  }
  sendValidityInformations(a?:any){
    if(!a){
      this.forCssClasses={
      toponimo:this.pagamentoForm.controls['cdToponimo'].disabled?true:this.pagamentoForm.controls['cdToponimo'].valid,
      indirizzo:this.pagamentoForm.controls['indirizzo'].disabled?true:this.pagamentoForm.controls['indirizzo'].valid,
      cap:this.pagamentoForm.controls['cap'].valid,provincia:this.pagamentoForm.controls['cdProvincia'].disabled?true:this.pagamentoForm.controls['cdProvincia'].valid,
      comune:this.pagamentoForm.controls['cdComune'].disabled?true:this.pagamentoForm.controls['cdComune'].valid,presso:this.pagamentoForm.controls['presso'].valid,
      frazione:this.pagamentoForm.controls['frazione'].valid,numeroCivico:this.pagamentoForm.controls['numeroCivico'].valid,
      codiceFiscale:this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').valid,nome:this.pagamentoForm.controls['coincideConCliente'].get('nome').valid,
      cognome:this.pagamentoForm.controls['coincideConCliente'].get('cognome').valid,iban:this.pagamentoForm.controls['coincideConCliente'].get('iban').valid,
      submitted:true
    }
    }else{
      this.forCssClasses={
        toponimo:this.pagamentoForm.controls['cdToponimo'].disabled?true:this.pagamentoForm.controls['cdToponimo'].valid,
        indirizzo:this.pagamentoForm.controls['indirizzo'].disabled?true:this.pagamentoForm.controls['indirizzo'].valid,
        cap:this.pagamentoForm.controls['cap'].valid,provincia:this.pagamentoForm.controls['cdProvincia'].disabled?true:this.pagamentoForm.controls['cdProvincia'].valid,
        comune:this.pagamentoForm.controls['cdComune'].disabled?true:this.pagamentoForm.controls['cdComune'].valid,presso:this.pagamentoForm.controls['presso'].valid,
        frazione:this.pagamentoForm.controls['frazione'].valid,numeroCivico:this.pagamentoForm.controls['numeroCivico'].valid,
        codiceFiscale:this.pagamentoForm.controls['coincideConCliente'].get('codiceFiscale').valid,nome:this.pagamentoForm.controls['coincideConCliente'].get('nome').valid,
        cognome:this.pagamentoForm.controls['coincideConCliente'].get('cognome').valid,iban:this.pagamentoForm.controls['coincideConCliente'].get('iban').valid,
        submitted:this.forCssClasses?.submitted==true?true:false

      }
    }

  }
  updateChanges($event){
    this.sendValidityInformations($event)
  }
}
