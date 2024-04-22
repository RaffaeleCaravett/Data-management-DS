import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContrattiService } from '../../contratti.service';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from '../../../../shared/dialog/dialog2/dialog2.component';
import { DynamicSizes } from 'app/shared/dialog/dialog2/dynamic-sizes';
import { CabineRemi, TipiContatore, TipiUtilizzo, TipoFornitura, TipologiaUtenza, Distributori, CategoriaUso, ClassiPrelievo, TipiOfferta, Listini, TipiMercato, Resellers, Stati, Fornitori, accisaAgevolata, Accise, Diretto, Correttori } from './informazioni-fornitura';
import { Comuni, Provincie, Toponimi, tipiContratto } from '../cliente/cliente';
import { InformazioniFornituraService } from './informazioni-fornitura.service';
import { DettagliContratto, indirizzoResidenza } from '../../contratti-large';

@Component({
  selector: 'ngx-informazioni-fornitura',
  templateUrl: './informazioni-fornitura.component.html',
  styleUrls: ['./informazioni-fornitura.component.scss'],
})
export class InformazioniFornituraComponent implements OnInit {
  informazioniFornituraForm: FormGroup;
  @Output() indietro = new EventEmitter<string>();
  @Output() value = new EventEmitter<number>();
  @Output() cdContratto = new EventEmitter<string>();
  @Output() activated = new EventEmitter<string>()
  @Input() codiceContratto: string;
  todayDate: string
  tipologieUtenze: TipologiaUtenza[];
  tipiFornitura: TipoFornitura[];
  tipiContatore: TipiContatore[];
  tipiUtilizzo: TipiUtilizzo[];
  cabineRemi: CabineRemi[];
  distributori: Distributori[];
  categorieUso: CategoriaUso[];
  classiPrelievo: ClassiPrelievo[];
  tipiOfferta: TipiOfferta[];
  listini: Listini[];
  tipiMercato: TipiMercato[];
  resellers: Resellers[];
  stati: Stati[];
  fornitori: Fornitori[];
  provincie: Provincie[];
  toponimi: Toponimi[];
  comuneElenco1: Comuni[];
  readO: boolean = false;
  pdfSrc0: string
  correttoreArray: Correttori[]
  acciseArray: Accise[]
  agevolataArray: accisaAgevolata[]
  direttoArray: Diretto[]
  fornitori1: Fornitori[];
  fornituraRDT: boolean;
  dataIndirizzo:{}
  forCssClasses:{
    toponimo:boolean,indirizzo:boolean,
    cap:boolean,provincia:boolean,comune:boolean,
    presso:boolean,frazione:boolean,numeroCivico:boolean,
    mercatoProvenienza:boolean,tempiRecessoMesi:boolean,
    fornitoreUscente1:boolean,fornitoreUscente2:boolean,
    dataInizioPrevista:boolean,calcoloProvvigioni:boolean,
    switchDistributore:boolean,resellerSwitch:boolean,
    ultimaBolletta:boolean,
    submitted?:boolean
  }

  constructor(
    private contrattiService: ContrattiService,
    private cdr: ChangeDetectorRef,
    private serviziSottomenuService: ServiziSottomenuService,
    public dialog: MatDialog,
    private informazioniFornituraFormService:InformazioniFornituraService,
    private formBuilder:FormBuilder
  ) { }

  //onInit che inizializza il form e se ha il codiceContratto riempie gli input con le informazioni che riceve e , se necessario, disabilita il form.
  ngOnInit(): void {
    this.fornituraRDT = false
    this.todayDate = new Date().toISOString().slice(0, 10);
    this.informazioniFornituraForm = this.formBuilder.group({
      cdTipoFornitura: new FormControl(null,Validators.required),
      pdr: new FormControl(null, Validators.required),
      matricolaContatore: new FormControl(null, Validators.required),
      volumeMcAnnuo: new FormControl(null, Validators.required),
      tipoContatore: new FormControl(null, Validators.required),
      cabinaRemi: new FormControl(null, Validators.required),
      matricolaConvertitore: new FormControl(null),
      tipologiaUtenza: new FormControl(null, Validators.required),
      correttoreMisuraVolumi: new FormControl(null, Validators.required),
      tipoUtilizzo: new FormControl(null, Validators.required),
      distributore: new FormControl(null, Validators.required),
      categoriaUso: new FormControl(null, Validators.required),
      tipoAccise: new FormControl(null, Validators.required),
      classePrelievo: new FormControl(null, Validators.required),
      accisaAgevolata: new FormControl(null, Validators.required),
      clienteDiretto: new FormControl(null, Validators.required),
      licenzaOfficina: new FormControl(null,Validators.required),
      indirizzoFornitura: this.formBuilder.group({
        coincide: new FormControl(),
        puntoPrelievoCoincide: new FormControl(),
        cdToponimo: new FormControl(null, Validators.required),
        indirizzo: new FormControl(null, Validators.required),
        numeroCivico: new FormControl(null, Validators.required),
        cdProvincia: new FormControl(null, Validators.required),
        cdComune: new FormControl(null, Validators.required),
        cap: new FormControl(null, Validators.required),
        presso: new FormControl(),
        frazione: new FormControl(),
      }),
      condizioniTecnicoEconomiche: this.formBuilder.group({
        tipologiaOfferta: new FormControl(null,Validators.required),
        listino: new FormControl(null,Validators.required),
      }),
      informazioniAggiuntive: this.formBuilder.group({
        mercatoProvenienza: new FormControl(null, Validators.required),
        tempiRecessoMesi: new FormControl(null, Validators.required),
        fornitoreUscente1: new FormControl(null, Validators.required),
        fornitoreUscente2: new FormControl(),
        dataInizioPrevista: new FormControl(null, Validators.required),
        calcoloProvvigioni: new FormControl(null,Validators.required),
        switchDistributore: new FormControl(),
        resellerSwitch: new FormControl(null,Validators.required),
        ultimaBolletta: new FormControl(),
      }),
    });
    if (this.codiceContratto) {
      this.contrattiService.getRicercaContratto(this.codiceContratto).subscribe((data: DettagliContratto) => {
        if (data.fornituraResponseDto) {
          this.dataIndirizzo={data:data.fornituraResponseDto.indirizzoFornitura,stato:data.clienteResponseDto.statoContratto,
          informazioniFornitura:data.fornituraResponseDto}
          this.fornituraRDT = true
          let a: string
          if (data.fornituraResponseDto.dataInizioPrevista) {
            let b = data.fornituraResponseDto.dataInizioPrevista.toString()
            a = new Date(b.replace(',', '-')).toISOString().slice(0, 10)
          }
          this.informazioniFornituraForm = new FormGroup({
            cdTipoFornitura: new FormControl(data.fornituraResponseDto.tipoFornitura.cdTipoFornitura),
            pdr: new FormControl(data.fornituraResponseDto.pdr),
            matricolaContatore: new FormControl(data.fornituraResponseDto.matricolaContatore),
            volumeMcAnnuo: new FormControl(data.fornituraResponseDto.volumeMcAnnuo),
            tipoContatore: new FormControl(data.fornituraResponseDto.tipoContatore.cdTipoContatore),
            cabinaRemi: new FormControl(data.fornituraResponseDto.cremi.cdRemi),
            matricolaConvertitore: new FormControl(data.fornituraResponseDto.matricolaConvertitore),
            tipologiaUtenza: new FormControl(data.fornituraResponseDto.tipologiaUtenza.id),
            correttoreMisuraVolumi: new FormControl(data.fornituraResponseDto.correttoreMisuraVolumi.cdCorrettoreMisuraVolumi),
            tipoUtilizzo: new FormControl(data.fornituraResponseDto.tipoUtilizzo.cdTipoUtilizzo),
            distributore: new FormControl(data.fornituraResponseDto.distributore.cdDistributore),
            categoriaUso: new FormControl(data.fornituraResponseDto.categotriaUso.cdCategoriaUso),
            tipoAccise: new FormControl(data.fornituraResponseDto.tipoAccise.cdTipoAccisa),
            classePrelievo: new FormControl(data.fornituraResponseDto.classePrelievo.cdClassePrelievo),
            accisaAgevolata: new FormControl(data.fornituraResponseDto.accisaAgevolata.cdAccisaAgevolata),
            clienteDiretto: new FormControl(data.fornituraResponseDto.clienteDiretto.cdClienteDiretto),
            licenzaOfficina: new FormControl(data.fornituraResponseDto.flagLicenzaOfficina),
            indirizzoFornitura: new FormGroup({
              coincide: new FormControl(data.fornituraResponseDto.indirizzoFornitura.isCopyOfResidenza),
              puntoPrelievoCoincide: new FormControl(null),
              cdToponimo: new FormControl(data.fornituraResponseDto.indirizzoFornitura.toponimo.cdToponimo),
              indirizzo: new FormControl(data.fornituraResponseDto.indirizzoFornitura.indirizzo),
              numeroCivico: new FormControl(data.fornituraResponseDto.indirizzoFornitura.numeroCivico),
              cdProvincia: new FormControl(data.fornituraResponseDto.indirizzoFornitura.provincia.cdProvincia),
              cdComune: new FormControl(),
              cap: new FormControl(data.fornituraResponseDto.indirizzoFornitura.cap),
              presso: new FormControl(data.fornituraResponseDto.indirizzoFornitura.presso),
              frazione: new FormControl(data.fornituraResponseDto.indirizzoFornitura.frazione),
            }),
            condizioniTecnicoEconomiche: new FormGroup({
              tipologiaOfferta: new FormControl(data.fornituraResponseDto.tipologiaOfferta.cdTipoOfferta),
              listino: new FormControl(),
            }),
            informazioniAggiuntive: new FormGroup({
              mercatoProvenienza: new FormControl(data.fornituraResponseDto.mercatoProvenienza.idTipoMercato),
              tempiRecessoMesi: new FormControl(data.fornituraResponseDto.mesiRecesso),
              fornitoreUscente1: new FormControl(data.fornituraResponseDto.fornitoreUscente1.idFornitore),
              fornitoreUscente2: new FormControl(data.fornituraResponseDto.fornitoreUscente2),
              dataInizioPrevista: new FormControl(a),
              calcoloProvvigioni: new FormControl(data.fornituraResponseDto.flagProvvigionale),
              switchDistributore: new FormControl(data.fornituraResponseDto.switchDiretto),
              resellerSwitch: new FormControl(data.fornituraResponseDto.resellerSwitch.id),
              ultimaBolletta: new FormControl(),
            }),
          });
          this.contrattiService.getListino(data.fornituraResponseDto.tipologiaOfferta.cdTipoOfferta).subscribe((data: Listini[]) => {
            this.listini = data
            this.informazioniFornituraForm.controls['condizioniTecnicoEconomiche'].get('listino').setValue(this.listini[0].id)
            this.cdr.markForCheck();
          });
          this.serviziSottomenuService.visualizzaComuni(data.fornituraResponseDto.indirizzoFornitura.provincia.cdProvincia).subscribe((payload: Comuni[]) => {
            if (payload) {
              this.comuneElenco1 = payload;
              this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdComune').setValue(data.fornituraResponseDto.indirizzoFornitura.comune.cdComune)
              if (data.clienteResponseDto.statoContratto == 'COMPLETO') {
                this.informazioniFornituraForm.disable();
              }
            }
          });
        }else{
          this.dataIndirizzo={data:'',stato:data.clienteResponseDto.statoContratto,
            informazioniFornitura:''}
        }
      });
    }
    this.contrattiService.getTipologieUtenze().subscribe((data: TipologiaUtenza[]) => {
      this.tipologieUtenze = data;
    });
    this.contrattiService.getTipiFornitura().subscribe((data: TipoFornitura[]) => {
      this.tipiFornitura = data;
    });
    this.contrattiService.getTipiContatore().subscribe((data: TipiContatore[]) => {
      this.tipiContatore = data;
    });
    this.contrattiService.getTipiUtilizzo().subscribe((data: TipiUtilizzo[]) => {
      this.tipiUtilizzo = data;
    });
    this.contrattiService.getCabineRemi().subscribe((data: CabineRemi[]) => {
      this.cabineRemi = data;
    });
    this.contrattiService.getDistributore().subscribe((data: Distributori[]) => {
      this.distributori = data;
    });
    this.contrattiService.getCategoriaUso().subscribe((data: CategoriaUso[]) => {
      this.categorieUso = data;
    });
    this.contrattiService.getClassePrelievo().subscribe((data: ClassiPrelievo[]) => {
      this.classiPrelievo = data;
    });
    this.contrattiService.getTipoOfferta().subscribe((data: TipiOfferta[]) => {
      this.tipiOfferta = data;
    });
    this.contrattiService.getTipoMercato().subscribe((data: TipiMercato[]) => {
      this.tipiMercato = data;
    });
    this.contrattiService.getReseller().subscribe((data: Resellers[]) => {
      this.resellers = data;
    });
    this.contrattiService.getStato().subscribe((data: Stati[]) => {
      this.stati = data;
    });
    this.contrattiService.getFornitore().subscribe((data: Fornitori[]) => {
      this.fornitori = data;
      this.fornitori1 = data;
    });
    this.contrattiService.getAcciseAgevolate().subscribe((data: accisaAgevolata[]) => {
      this.agevolataArray = data
    })
    this.contrattiService.getCorrettore().subscribe((data: Correttori[]) => {
      this.correttoreArray = data
    })
    this.contrattiService.getTipoAccise().subscribe((data: Accise[]) => {
      this.acciseArray = data
    })
    this.contrattiService.getClienteDiretto().subscribe((data: Diretto[]) => {
      this.direttoArray = data
    })
    this.serviziSottomenuService.visualizzaProvincia1().subscribe((payload: Provincie[]) => {
      if (payload) {
        this.provincie = payload;
      }
    });
    this.serviziSottomenuService.visualizzaToponimo1().subscribe((payload: Toponimi[]) => {
      if (payload) {
        this.toponimi = payload;
      }
    });
    this.value.emit(75);
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
    const comune = this.comuneElenco1.find(
      (comune) => comune.codiceComune == codice
    );
    this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cap').setValue(comune.cap);
    this.cdr.markForCheck();
  }

  getListinis(valoreListino: string) {
    return this.contrattiService.getListino(valoreListino).subscribe((data: Listini[]) => {
      this.listini = data;
      this.cdr.markForCheck();
    });
  }
  file(file: any) {
    let file0 = file.target.files[0];
    this.pdfSrc0 = file0.name;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc0 = e.target.result;
    };
    reader.readAsArrayBuffer(file.target.files[0]);
  }
  //funzione che verifica se ci sono le condizioni necessarie per inserire i dati sul server
  submitInformazioniFornitura() {
    if (this.informazioniFornituraForm.valid) {
      if (this.informazioniFornituraForm.controls['indirizzoFornitura'].get('coincide').value) {
        this.coincideResidenza()
      }
      this.contrattiService.postInformazioniFornitura(
this.informazioniFornituraFormService.post(this.codiceContratto,this.informazioniFornituraForm.controls)
        ).subscribe((data: any) => {
          this.activated.emit('filesAllegati')
        }, err => {
          const dialogRef = this.dialog.open(Dialog2Component, {
            data: err,
            width: DynamicSizes.mediumWidth,
            height: DynamicSizes.mediumHeight,
          })
          dialogRef.afterClosed().subscribe((result) => {
          })
        });
    }
  }

  //funzione che inserisce le informazioniFornituraForm sul server tramite richiamo di una funzione verifica tutte le condizioni
  inviaInformazioniFornitura() {
    if (this.informazioniFornituraForm.disabled || this.fornituraRDT == true) {
      this.activated.emit('filesAllegati')
    } else if (this.informazioniFornituraForm.valid && this.fornituraRDT == false) {
      this.submitInformazioniFornitura();
    }else{
      this.sendValidityInformations()
    }
  }

  //funzione che emette un evento per andare su 'pagamento'
  vaiIndietro() {
    this.cdContratto.emit(this.codiceContratto);
    this.activated.emit('pagamento');
  }

  //funzione per riempire o svuotare gli input in caso di coincidenza con la residenza precedentemente inserita, del formGroup 'indirizzoFornitura'
  coincideResidenza() {
    this.comuneElenco1=[]
    if (this.informazioniFornituraForm.controls['indirizzoFornitura'].get('coincide').value) {
      this.contrattiService.getIndirizzoResidenza(this.codiceContratto).subscribe((data: indirizzoResidenza) => {
      this.informazioniFornituraFormService.coincideResidenza(this.informazioniFornituraForm.controls,this.readO,data)
        this.serviziSottomenuService.visualizzaComuni(data.provincia.cdProvincia).subscribe((payload: any) => {
          if (payload) {
            this.comuneElenco1 = payload;
            this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdComune').setValue(data.comune.cdComune);
          }
        });
      });
    } else {
      this.informazioniFornituraFormService.coincideResidenza(this.informazioniFornituraForm.controls,this.readO)
    }
    this.informazioniFornituraForm.controls['indirizzoFornitura'].updateValueAndValidity()
  }
  sendValidityInformations(event?:Event){
    if(!event){
      this.forCssClasses={
      toponimo:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdToponimo').valid,indirizzo:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('indirizzo').valid,
      cap:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cap').valid,provincia:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdProvincia').valid,
      comune:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdComune').valid,presso:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('presso').valid,
      frazione:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('frazione').valid,numeroCivico:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('numeroCivico').valid,
      mercatoProvenienza:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('mercatoProvenienza').valid,tempiRecessoMesi:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('tempiRecessoMesi').valid,
      fornitoreUscente1:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('fornitoreUscente1').valid,fornitoreUscente2:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('fornitoreUscente2').valid,
      dataInizioPrevista:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('dataInizioPrevista').valid,calcoloProvvigioni:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('calcoloProvvigioni').valid,
      switchDistributore:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('switchDistributore').valid,resellerSwitch:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('resellerSwitch').valid,
      ultimaBolletta:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('ultimaBolletta').valid,
      submitted:true
    }
    }else{
      this.forCssClasses={
        toponimo:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdToponimo').valid,indirizzo:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('indirizzo').valid,
        cap:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cap').valid,provincia:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdProvincia').valid,
        comune:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('cdComune').valid,presso:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('presso').valid,
        frazione:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('frazione').valid,numeroCivico:this.informazioniFornituraForm.controls['indirizzoFornitura'].get('numeroCivico').valid,
        mercatoProvenienza:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('mercatoProvenienza').valid,tempiRecessoMesi:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('tempiRecessoMesi').valid,
        fornitoreUscente1:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('fornitoreUscente1').valid,fornitoreUscente2:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('fornitoreUscente2').valid,
        dataInizioPrevista:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('dataInizioPrevista').valid,calcoloProvvigioni:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('calcoloProvvigioni').valid,
        switchDistributore:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('switchDistributore').valid,resellerSwitch:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('resellerSwitch').valid,
        ultimaBolletta:this.informazioniFornituraForm.controls['informazioniAggiuntive'].get('ultimaBolletta').valid,
        submitted:this.forCssClasses?.submitted==true?true:false

      }
    }

  }
  updateChanges($event){
    this.sendValidityInformations($event)
  }
}
