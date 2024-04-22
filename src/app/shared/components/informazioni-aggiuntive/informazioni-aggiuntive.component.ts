import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Fornitori, Resellers, TipiMercato } from 'app/pages/contratti/nuovo/informazioni-fornitura/informazioni-fornitura';
import { InformazioniFornituraService } from 'app/pages/contratti/nuovo/informazioni-fornitura/informazioni-fornitura.service';

@Component({
  selector: 'ngx-informazioni-aggiuntive',
  templateUrl: './informazioni-aggiuntive.component.html',
  styleUrls: ['./informazioni-aggiuntive.component.scss']
})
export class InformazioniAggiuntiveComponent implements OnInit {
form:FormGroup
@Input() fornitori:Fornitori[]
@Input() fornitori1:Fornitori[]
@Input() tipiMercato:TipiMercato[]
@Input() resellers:Resellers[]
todayDate: string
  pdfSrc0: string;
@Input() infoClasses:{
    toponimo: boolean, indirizzo: boolean,
    cap: boolean, provincia: boolean, comune: boolean,
    presso: boolean, frazione: boolean, numeroCivico,
    mercatoProvenienza:boolean,tempiRecessoMesi:boolean,
    fornitoreUscente1:boolean,fornitoreUscente2:boolean,
    dataInizioPrevista:boolean,calcoloProvvigioni:boolean,
    switchDistributore:boolean,resellerSwitch:boolean,
    ultimaBolletta:boolean,
    submitted?: boolean
}
@Input() codiceContratto:string
@Output() sendInformationOnValidityChanges = new EventEmitter<any>()
@Input() data:any
constructor(private rootFormGroup:FormGroupDirective,private informazioniFornituraFormService:InformazioniFornituraService) { }

  ngOnInit(): void {
    this.form=this.rootFormGroup.control
    if (this.codiceContratto) {
      setTimeout(()=>{
        if(this.data && this.data.informazioniFornitura){
          let a:string
          if (this.data.informazioniFornitura.dataInizioPrevista) {
            let b = this.data.informazioniFornitura.dataInizioPrevista.toString()
            a = new Date(b.replace(',', '-')).toISOString().slice(0, 10)
          }
 this.form = new FormGroup({
  informazioniAggiuntive: new FormGroup({
    mercatoProvenienza: new FormControl(this.data.informazioniFornitura.mercatoProvenienza.idTipoMercato),
    tempiRecessoMesi: new FormControl(this.data.informazioniFornitura.mesiRecesso),
    fornitoreUscente1: new FormControl(this.data.informazioniFornitura.fornitoreUscente1.idFornitore),
    fornitoreUscente2: new FormControl(this.data.informazioniFornitura.fornitoreUscente2),
    dataInizioPrevista: new FormControl(a),
    calcoloProvvigioni: new FormControl(this.data.informazioniFornitura.flagProvvigionale),
    switchDistributore: new FormControl(this.data.informazioniFornitura.switchDiretto),
    resellerSwitch: new FormControl(this.data.informazioniFornitura.resellerSwitch.id),
    ultimaBolletta: new FormControl(),
  }),
      })
    }
       setTimeout(()=>{
        if(this.data.stato&& this.data.stato=='COMPLETO'){
       this.form.disable()}
       },500)
      },1200)
     
    }
  }
  file(a: any) {
    let file0 = a.target.files[0];
    this.pdfSrc0 = file0.name;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc0 = e.target.result;
    };
    reader.readAsArrayBuffer(a.target.files[0]);
  }
  setInfoValidityChanges(a:any){
    setTimeout(()=>{
   this.sendInformationOnValidityChanges.emit(a)
 },500)
 }
}
