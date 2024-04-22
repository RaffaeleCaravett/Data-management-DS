import {ChangeDetectorRef,Component, EventEmitter, Input, OnInit, Output,ViewChild,} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';
import { ContrattiService } from '../../contratti.service';
import { ClienteService } from './cliente.service';
import { DynamicSizes, Errors } from 'app/shared/dialog/dialog2/dynamic-sizes';
import { AnagraficaCliente,Comuni, Provincie,Toponimi,tipiClientsAbilitati,tipiContratto,} from './cliente';
import { DettagliContratto } from '../../contratti-large';

@Component({
  selector: 'ngx-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  @ViewChild('textArea') textArea;
  @Output() activated = new EventEmitter<string>();
  @Output() cdContratto = new EventEmitter<string>();
  @Output() value = new EventEmitter<number>();
  @Output() color = new EventEmitter<string>();
  cliente: FormGroup;
  anagraficaDto: FormGroup;
  indirizzoResidenza: FormGroup;
  provincie: Provincie[];
  toponimi: Toponimi[];
  comuneElenco: Comuni[];
  comuneElenco1: Comuni[];
  date: string;
  datiCliente: AnagraficaCliente;
  search: boolean = true;
  readOnly = false;
  tipiClientsAbilitati: tipiClientsAbilitati;
  tipiContracts: tipiContratto;
  @Input() codiceContratto: string;
  dataStipula: string;
  dataNascita: string;
  dataIndirizzo: {};
  forCssClasses: {
    toponimo: boolean;
    indirizzo: boolean;
    cap: boolean;
    provincia: boolean;
    comune: boolean;
    presso: boolean;
    frazione: boolean;
    numeroCivico: boolean;
    submitted?: boolean;
  };
  constructor( public dialog: MatDialog,private serviziSottoMenu: ServiziSottomenuService,private contrattiService: ContrattiService,
    private cdr: ChangeDetectorRef, private clienteService: ClienteService,private formBuilder: FormBuilder
  ) {}

  // funzione che emette un evento per attivare ngx-pagament
  activate() {
    this.activated.emit('pagamento');
  }
  //onInit con funzioni di ricerca in caso di visualizzazione specifica di un contratto, settaggio del form, get di provincie, comuni , cap e necessario
  ngOnInit(): void {
    this.setInitialValues();
    this.cliente = this.formBuilder.group({
      codiceContratto: new FormControl(null, Validators.required),
      dataStipula: new FormControl(null, Validators.required),
      luogoStipula: new FormControl(null, Validators.required),
      cdTipoContratto: new FormControl('OPZ_GAS', Validators.required),
      cdTipoCliente: new FormControl('DOM', Validators.required),
      anagraficaDto: this.formBuilder.group({
        ricerc: new FormControl( null, Validators.pattern( '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$') ),
        codiceFiscale: new FormControl(null, [Validators.required, Validators.pattern( '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$' ),]),
        cognome: new FormControl(null, Validators.required),
        ragioneSociale: new FormControl(),
        nome: new FormControl(null, Validators.required),
        codiceDestinatario: new FormControl(),
        sesso: new FormControl(null, Validators.required),
        dataNascita: new FormControl(null, Validators.required),
        provinciaNascita: new FormControl(null, Validators.required),
        comuneNascita: new FormControl(null, Validators.required),
        partitaIva: new FormControl(),
        cdTipoOrganizzazione: new FormControl(),
        email: new FormControl( null, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/) ),
        emailPec: new FormControl( null,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/) ),
        telefono: new FormControl(),
        cellulare: new FormControl(),
      }),
      indirizzoResidenza: this.formBuilder.group({
        cdToponimo: new FormControl(null, Validators.required),
        indirizzo: new FormControl(null, Validators.required),
        numeroCivico: new FormControl(null, Validators.required),
        cap: new FormControl(null, Validators.required),
        cdComune: new FormControl(null, Validators.required),
        cdProvincia: new FormControl(null, [ Validators.required, Validators.minLength(1), ]),
        frazione: new FormControl(),
        presso: new FormControl(),
      }),
    });
    if (this.codiceContratto) {
      this.contrattiService.getRicercaContratto(this.codiceContratto).subscribe((data: DettagliContratto) => {
          this.dataIndirizzo = {
            data: data.clienteResponseDto.indirizzoResidenza,
            stato: data.clienteResponseDto.statoContratto,
          };
          this.dataStipula = data.clienteResponseDto.dataStipula.toString();
          this.dataStipula = new Date(this.dataStipula.replace(',', '-')) .toISOString() .slice(0, 10);
          if (data.clienteResponseDto.anagrafica.dataNascita) {
            this.dataNascita = data.clienteResponseDto.anagrafica.dataNascita.toString();
            this.dataNascita = new Date(this.dataNascita.replace(',', '-')) .toISOString() .slice(0, 10);
          }
          this.cliente = new FormGroup({
            codiceContratto: new FormControl( data.clienteResponseDto.codiceContratto, Validators.required  ),
            dataStipula: new FormControl(this.dataStipula, Validators.required),
            luogoStipula: new FormControl(  data.clienteResponseDto.luogoStipula,Validators.required),
            cdTipoContratto: new FormControl('OPZ_GAS', Validators.required),
            cdTipoCliente: new FormControl( data.clienteResponseDto.tipoCliente.cdTipoCliente,Validators.required ),
            note: new FormControl(),
            anagraficaDto: new FormGroup({
              ricerc: new FormControl(null,Validators.pattern(  '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')),
              codiceFiscale: new FormControl( data.clienteResponseDto.anagrafica.codiceFiscale,  [Validators.required, Validators.pattern(
                 '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$' ),]),
              cognome: new FormControl( data.clienteResponseDto.anagrafica.cognome,  Validators.required ),
              ragioneSociale: new FormControl(data.clienteResponseDto.anagrafica.ragioneSociale ),
              nome: new FormControl( data.clienteResponseDto.anagrafica.nome, Validators.required ),
              codiceDestinatario: new FormControl( data.clienteResponseDto.anagrafica.codiceDestinatario ),
              sesso: new FormControl( data.clienteResponseDto.anagrafica.sesso, Validators.required ),
              dataNascita: new FormControl(  this.dataNascita || '',  Validators.required  ),
              provinciaNascita: new FormControl( data.clienteResponseDto.anagrafica.idProvinciaNascita, Validators.required ),
              comuneNascita: new FormControl(null, Validators.required),
              partitaIva: new FormControl(  data.clienteResponseDto.anagrafica.partitaIva  ),
              cdTipoOrganizzazione: new FormControl(data.clienteResponseDto.anagrafica.cdTipoOrganizzazione ),
              email: new FormControl( data.clienteResponseDto.anagrafica.email, Validators.pattern( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/  ) ),
              emailPec: new FormControl(  data.clienteResponseDto.anagrafica.emailPec, Validators.pattern(  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/  ) ),
              telefono: new FormControl( data.clienteResponseDto.anagrafica.telefonoFisso  ),
              cellulare: new FormControl( data.clienteResponseDto.anagrafica.telefonoMobile ),
            }),
            indirizzoResidenza: new FormGroup({
              cdToponimo: new FormControl( data.clienteResponseDto.indirizzoResidenza.toponimo.cdToponimo,  Validators.required ),
              indirizzo: new FormControl( data.clienteResponseDto.indirizzoResidenza.indirizzo,  Validators.required ),
              numeroCivico: new FormControl( data.clienteResponseDto.indirizzoResidenza.numeroCivico, Validators.required),
              cap: new FormControl( data.clienteResponseDto.indirizzoResidenza.cap,Validators.required ),
              cdComune: new FormControl(null, Validators.required),
              cdProvincia: new FormControl( data.clienteResponseDto.indirizzoResidenza.provincia.cdProvincia, [Validators.required, Validators.minLength(1)]),
              frazione: new FormControl(data.clienteResponseDto.indirizzoResidenza.frazione),
              presso: new FormControl(data.clienteResponseDto.indirizzoResidenza.presso),
            }),
          });
          this.takeComuni( data,this.cliente, data.clienteResponseDto.statoContratto);
        });
    }
    //set max data value today ..
    this.date = new Date().toISOString().slice(0, 10);
  }

  //funzione che avviene al change di tipoCliente, imposta il campo per gli input necessari
  tipiClientsA() {
    this.cleanField();
    this.clienteService.changeTypeClient(this.cliente);
  }
  //ricerca dall'anagrafica del cliente, sia 'DOM' che 'ORG'
  ricercaAnag(ricercaValue: any) {
    let ricerca = '';
    if (!ricercaValue.target &&this.cliente.controls['anagraficaDto'].get('ricerc').valid) {
      ricerca = ricercaValue;
      this.contrattiService.getAnagraficaUno(ricerca.toUpperCase()).subscribe(
        (data: AnagraficaCliente) => {
          if (data) {
            this.ricercaAnagToCall(data);
          }
        },
        (err) => {
          if (!ricercaValue.target) {
            this.clienteService.openDialog(err, this.dialog, DynamicSizes,  this.search, Errors.emptySearch );
            this.search = false;
          }
        }
      );
    } else if (
      ricercaValue.target &&
      this.cliente.controls['cdTipoCliente'].value == 'DOM' &&
      this.cliente.controls['anagraficaDto'].get('codiceFiscale').valid
    ) {
      ricerca = ricercaValue.target.value;
      this.contrattiService .getAnagraficaUno(ricerca.toUpperCase()).subscribe((data: AnagraficaCliente) => {
          if (data) {
            this.ricercaAnagToCall(data);
          }
        });
    } else if (
      ricercaValue.target &&
      this.cliente.controls['cdTipoCliente'].value == 'ORG' &&
      this.cliente.controls['anagraficaDto'].get('partitaIva').valid
    ) {
      ricerca = ricercaValue.target.value;
      this.contrattiService.getAnagraficaUno(ricerca.toUpperCase()).subscribe((data: AnagraficaCliente) => {
          if (data) {
            this.ricercaAnagToCall(data);
          }
        });
    } else if (!ricercaValue.target) {
      this.clienteService.openDialog(
        Errors.datasNotSatisfies,
        this.dialog,
        DynamicSizes,
        this.search
      );
      this.search = false;
    }
  }
  //funzione per pulire i campi e settare l'input di nuovo per la ricerca
  cleanFunction() {
    if (this.cliente.controls['anagraficaDto'].get('ricerc').value == '') {
      this.cleanField();
    } else if (
      this.cliente.controls['anagraficaDto'].get('ricerc').value.length > 0
    ) {
      this.search = true;
    }
  }
  //tre funzioni per recuperare i comuni e i cap
  visualizzaComuni(selectCodice: any) {
    const codiceComune = selectCodice.target.value;
    if (codiceComune && codiceComune != '') {
      this.serviziSottoMenu.visualizzaComuni(codiceComune)  .subscribe((payload: Comuni[]) => {
          if (payload) {
            this.comuneElenco = payload;
          }
        });
    }
  }
  visualizzaComuni1(selectCodice: any) {
    const codiceComune = selectCodice.target.value;
    if (codiceComune && codiceComune != '') {
      this.serviziSottoMenu.visualizzaComuni(codiceComune).subscribe((payload: Comuni[]) => {
          if (payload) {
            this.comuneElenco1 = payload;
          }
        });
    }
  }
  visualizzaCap(codiceComune: any) {
    const codice = codiceComune.target.value;
    const comune = this.comuneElenco1.find(
      (comune) => comune.codiceComune == codice
    );
    this.cliente.controls['indirizzoResidenza'].get('cap').setValue(comune.cap);
    this.cdr.markForCheck();
  }
  //funzione che avviene al submit del form, si occupa di verificare tutto il necessario per passare avanti,e ,in caso di richiedere interventi al cliente per validare i requisiti.
  confirm() {
    if (this.codiceContratto) {
      this.activate();
    }
    if (!this.codiceContratto) {
      switch (this.cliente.controls['cdTipoCliente'].value) {
        case 'DOM':
          if (this.cliente.valid) {
            this.cliente.controls['anagraficaDto'].get('sesso').enable();
            this.cliente.controls['anagraficaDto'] .get('sesso').setValue(this.datiCliente.sesso);
            this.cliente.controls['anagraficaDto'] .get('provinciaNascita') .enable();
            this.cliente.controls['anagraficaDto'] .get('provinciaNascita') .setValue(this.datiCliente.idProvinciaNascita);
            this.cliente.controls['anagraficaDto'] .get('comuneNascita') .enable();
            this.cliente.controls['anagraficaDto'] .get('comuneNascita')    .setValue(this.datiCliente.idComuneNascita);
            this.inserisciCliente();
          } else {
            this.inserisciCliente();
          }
          break;
        case 'ORG':
          if (this.cliente.valid) {
            this.cliente.controls['anagraficaDto'] .get('ragioneSociale') .enable();
            this.cliente.controls['anagraficaDto'].get('partitaIva').enable();
            this.cliente.controls['anagraficaDto'] .get('cdTipoOrganizzazione') .enable();
            this.cliente.controls['anagraficaDto'] .get('codiceDestinatario') .enable();
            this.inserisciCliente();
          } else {
            this.inserisciCliente();
          }
          break;
      }
      this.sendValidityInformations();
    }
  }
  //funzione che uso in richiamata al submit del form 'cliente' per postare i dati sul server
  inserisciCliente() {
    this.contrattiService.insertCliente({
        codiceContratto: this.cliente.controls['codiceContratto'].value,
        dataStipula: this.cliente.controls['dataStipula'].value,
        luogoStipula: this.cliente.controls['luogoStipula'].value,
        cdTipoContratto: this.cliente.controls['cdTipoContratto'].value,
        cdTipoCliente: this.cliente.controls['cdTipoCliente'].value,
        anagraficaDto: {
          codiceFiscale: this.cliente.controls['anagraficaDto'].get('codiceFiscale').value || '',
          partitaIva: this.cliente.controls['anagraficaDto'].get('partitaIva').value ||'',
          cognome:  this.cliente.controls['anagraficaDto'].get('cognome').value || '',
          ragioneSociale: this.cliente.controls['anagraficaDto'].get('ragioneSociale') .value || '',
          nome: this.cliente.controls['anagraficaDto'].get('nome').value || '',
          codiceDestinatario: this.cliente.controls['anagraficaDto'].get('codiceDestinatario') .value || '',
          sesso: this.cliente.controls['anagraficaDto'].get('sesso').value || '',
          dataNascita: this.cliente.controls['anagraficaDto'].get('dataNascita').value ||'',
          provinciaNascita: this.cliente.controls['anagraficaDto'].get('provinciaNascita').value || '',
          comuneNascita: this.cliente.controls['anagraficaDto'].get('comuneNascita').value || '',
          codiceTipoOrganizzazione: this.cliente.controls['anagraficaDto'].get('cdTipoOrganizzazione') .value || '',
          email:this.cliente.controls['anagraficaDto'].get('email').value || '',
          emailPec: this.cliente.controls['anagraficaDto'].get('emailPec').value || '',
          telefono: this.cliente.controls['anagraficaDto'].get('telefono').value || '',
          cellulare: this.cliente.controls['anagraficaDto'].get('cellulare').value || '',
        },
        indirizzoResidenza: {
          cdToponimo: this.cliente.controls['indirizzoResidenza'].get('cdToponimo') .value || '',
          indirizzo:this.cliente.controls['indirizzoResidenza'].get('indirizzo') .value || '',
          numeroCivico: this.cliente.controls['indirizzoResidenza'].get('numeroCivico') .value || '',
          cap: this.cliente.controls['indirizzoResidenza'].get('cap').value || '',
          cdComune:this.cliente.controls['indirizzoResidenza'].get('cdComune').value || '',
          cdProvincia: this.cliente.controls['indirizzoResidenza'].get('cdProvincia') .value || '',
          frazione: this.cliente.controls['indirizzoResidenza'].get('frazione').value || '',
          presso: this.cliente.controls['indirizzoResidenza'].get('presso').value || '',
        },
      }).subscribe(
        (data: any) => {
          this.cdContratto.emit(this.cliente.controls['codiceContratto'].value);
          this.activate();
        },
        (err: Error) => {
          this.clienteService.openDialog( err,this.dialog,DynamicSizes, this.search); });
  }
  cleanField() {
    this.search = true;
    this.readOnly = false;
    this.clienteService.cleanField(this.cliente);
  }
  setInitialValues() { this.serviziSottoMenu .visualizzaProvincia1() .subscribe((payload: Provincie[]) => {
        if (payload) {
          this.provincie = payload;
        }
      });
    this.serviziSottoMenu .visualizzaToponimo1().subscribe((payload: Toponimi[]) => {
        if (payload) {
          this.toponimi = payload;
        }
      });
    this.contrattiService.getTipiClienteAbilitati().subscribe((data: tipiClientsAbilitati) => {  this.tipiClientsAbilitati = data; })
    this.contrattiService .getTipiContratto().subscribe((data: tipiContratto) => { this.tipiContracts = data;});
    this.value.emit(25);
  }
  takeComuni(a: any, cliente: any, b: any) {  this.serviziSottoMenu .visualizzaComuni(a.clienteResponseDto.anagrafica.idProvinciaNascita) .subscribe((payload: Comuni[]) => {
        if (payload) {
          this.comuneElenco = payload;
          cliente.controls['anagraficaDto'].get('comuneNascita') .setValue(a.clienteResponseDto.anagrafica.idComuneNascita);
          this.cdr.markForCheck();
        }
      });
    this.serviziSottoMenu .visualizzaComuni( a.clienteResponseDto.indirizzoResidenza.provincia.cdProvincia ) .subscribe((payload: Comuni[]) => {
        if (payload) {
          this.comuneElenco1 = payload;
          cliente.controls['indirizzoResidenza'] .get('cdComune') .setValue(a.clienteResponseDto.indirizzoResidenza.comune.cdComune);
          if (b == 'COMPLETO') {
            this.color.emit('bg-success');
            this.cliente.disable();
          }
          this.cdr.markForCheck();
        }
      });
  }
  ricercaAnagToCall(a: AnagraficaCliente) {
    this.search = false;
    this.datiCliente = a;
    this.comuneElenco = [];
    this.cliente.controls['anagraficaDto'] .get('provinciaNascita')   .setValue(this.datiCliente.idProvinciaNascita || '');
    this.cliente.controls['anagraficaDto'] .get('codiceFiscale') .setValue(this.datiCliente.codiceFiscale || '');
    this.cliente.controls['anagraficaDto'].get('codiceDestinatario') .setValue(this.datiCliente.codiceDestinatario || '');
    this.cliente.controls['anagraficaDto'] .get('cognome') .setValue(this.datiCliente.cognome || '');
    this.cliente.controls['anagraficaDto'] .get('nome') .setValue(this.datiCliente.nome || '');
    this.cliente.controls['anagraficaDto'] .get('sesso') .setValue(this.datiCliente.sesso || '');
    this.cliente.controls['anagraficaDto'].get('sesso').disable();
    if (this.datiCliente.dataNascita) {
      this.dataNascita = this.datiCliente.dataNascita.toString();
      this.dataNascita = new Date(this.dataNascita.replace(',', '-')).toISOString() .slice(0, 10);
    }
    this.cliente.controls['anagraficaDto']  .get('dataNascita').setValue(this.dataNascita || '');
    this.serviziSottoMenu.visualizzaComuni(this.datiCliente.idProvinciaNascita) .subscribe((payload: Comuni[]) => {
        if (payload) {
          this.comuneElenco = payload;
          this.cliente.controls['anagraficaDto']  .get('comuneNascita') .setValue(this.datiCliente.idComuneNascita);
          this.cliente.controls['anagraficaDto'] .get('comuneNascita') .updateValueAndValidity();
          this.cdr.markForCheck();
          this.cliente.controls['anagraficaDto'] .get('provinciaNascita')  .disable();
          this.cliente.controls['anagraficaDto'].get('comuneNascita').disable();
        } else {
          this.cliente.controls['anagraficaDto'].get('comuneNascita').setValue('');
        }
      });
    this.cliente.controls['anagraficaDto'] .get('ragioneSociale') .setValue(this.datiCliente.ragioneSociale || '');
    this.cliente.controls['anagraficaDto'].get('partitaIva').setValue(this.datiCliente.partitaIva || '');
    this.cliente.controls['anagraficaDto'] .get('cdTipoOrganizzazione').setValue(this.datiCliente.cdTipoOrganizzazione || '');
    this.cliente.controls['anagraficaDto'].get('email').setValue(this.datiCliente.email || '');
    this.cliente.controls['anagraficaDto'].get('emailPec') .setValue(this.datiCliente.emailPec || '');
    this.cliente.controls['anagraficaDto'].get('telefono') .setValue(this.datiCliente.telefono || '');
    this.cliente.controls['anagraficaDto'].get('cellulare') .setValue(this.datiCliente.cellulare || '');
    setTimeout(() => {
      this.readOnly = true;
    }, 500);
  }
  sendValidityInformations(event?: Event) {
    if (!event) {
      this.forCssClasses = {
        toponimo: this.cliente.controls['indirizzoResidenza'].get('cdToponimo').valid,
        indirizzo: this.cliente.controls['indirizzoResidenza'].get('indirizzo').valid,
        cap: this.cliente.controls['indirizzoResidenza'].get('cap').valid,
        provincia: this.cliente.controls['indirizzoResidenza'].get('cdProvincia').valid,
        comune: this.cliente.controls['indirizzoResidenza'].get('cdComune').valid,
        presso: this.cliente.controls['indirizzoResidenza'].get('presso').valid,
        frazione: this.cliente.controls['indirizzoResidenza'].get('frazione').valid,
        numeroCivico: this.cliente.controls['indirizzoResidenza'].get('numeroCivico').valid,
        submitted: true,
      };
    } else {
      this.forCssClasses = {
        toponimo:this.cliente.controls['indirizzoResidenza'].get('cdToponimo').valid,
        indirizzo: this.cliente.controls['indirizzoResidenza'].get('indirizzo').valid,
        cap: this.cliente.controls['indirizzoResidenza'].get('cap').valid,
        provincia: this.cliente.controls['indirizzoResidenza'].get('cdProvincia').valid,
        comune:this.cliente.controls['indirizzoResidenza'].get('cdComune').valid,
        presso: this.cliente.controls['indirizzoResidenza'].get('presso').valid,
        frazione: this.cliente.controls['indirizzoResidenza'].get('frazione').valid,
        numeroCivico:this.cliente.controls['indirizzoResidenza'].get('numeroCivico').valid,
        submitted: this.forCssClasses?.submitted == true ? true : false,
      };
    }
  }
  updateChanges($event) {
    this.sendValidityInformations($event);
  }
}
