import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ContrattiService } from 'app/pages/contratti/contratti.service';
import { InformazioniFornituraService } from 'app/pages/contratti/nuovo/informazioni-fornitura/informazioni-fornitura.service';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';

@Component({
  selector: 'ngx-coincide-cliente-pagamento',
  templateUrl: './coincide-cliente-pagamento.component.html',
  styleUrls: ['./coincide-cliente-pagamento.component.scss']
})
export class CoincideClientePagamentoComponent implements OnInit {

  form: FormGroup
  readOi: boolean = false;
  org: boolean = false;
  @Input() codiceContratto: string
  @Input() data: any
  @Input() infoClasses: {
    toponimo: boolean, indirizzo: boolean,
    cap: boolean, provincia: boolean, comune: boolean,
    presso: boolean, frazione: boolean, numeroCivico,
    codiceFiscale:boolean,nome:boolean,
    cognome:boolean,iban:boolean,
    submitted?: boolean
  }
  @Output() sendInformationOnValidityChanges = new EventEmitter<any>()
  constructor(private cdr: ChangeDetectorRef, private serviziSottoMenu: ServiziSottomenuService, private rootFormGroup: FormGroupDirective,
    private contrattiService: ContrattiService, private informazioniFornituraFormService: InformazioniFornituraService) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control
    if (this.codiceContratto) {
      setTimeout(()=>{
        if(this.data && this.data.dataCoincide){
 this.form = new FormGroup({
        coincideConCliente: new FormGroup({
          coincideCliente: new FormControl(this.data.dataCoincide.isCopyOfAnagrafica||null),
          codiceFiscale: new FormControl(this.data.dataCoincide.codiceFiscale||null),
          nome: new FormControl(this.data.dataCoincide.nome||null),
          cognome: new FormControl(this.data.dataCoincide.cognome||null),
          iban: new FormControl(this.data.dataCoincide.iban||null),
        })
      })
    }
       this.data.dataTipoCliente== 'ORG' ? this.org = true : this.org = false
       setTimeout(()=>{
        this.data.stato=='COMPLETO'?this.form.disable():''
       },500)
      },1200)
     
    }
  }
  coincideClient() {
    if (this.form.controls['coincideConCliente'].get('coincideCliente').value) {
      this.contrattiService.getAnagraficaCliente(this.codiceContratto).subscribe((data: any) => {
        this.org == false ?
          this.setPagamentoFormValue(data)
          :
          this.setPagamentoFormValue(data)
      });
    } else {
      this.setPagamentoFormValue()
    }
    this.form.controls['coincideConCliente'].updateValueAndValidity()
  }
  setPagamentoFormValue(data?: any) {
    if (data != null) {
      this.form.controls['coincideConCliente'].patchValue({
        codiceFiscale: data.codiceFiscale||data.partitaIva, nome: data.nome||data.codiceDestinatario, cognome: data.cognome||data.ragioneSociale,
        iban:data.iban||''
      })
      this.readOi = true;
    }
    else {
      this.form.controls['coincideConCliente'].patchValue({
        codiceFiscale: null, nome: null, cognome: null
      })
      this.readOi = false;
    }
  }
  setInfoValidityChanges(a:any){
    setTimeout(()=>{
   this.sendInformationOnValidityChanges.emit(a)
 },500)
 }
}
