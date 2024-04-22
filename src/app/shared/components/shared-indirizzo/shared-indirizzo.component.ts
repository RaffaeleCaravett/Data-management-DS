import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contratti } from 'app/pages/contratti/contratti';
import { ContrattiService } from 'app/pages/contratti/contratti.service';
import { Comuni, Provincie, Toponimi } from 'app/pages/contratti/nuovo/cliente/cliente';
import { InformazioniFornituraService } from 'app/pages/contratti/nuovo/informazioni-fornitura/informazioni-fornitura.service';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';

@Component({
  selector: 'ngx-shared-indirizzo',
  templateUrl: './shared-indirizzo.component.html',
  styleUrls: ['./shared-indirizzo.component.scss']
})
export class SharedIndirizzoComponent implements OnInit {

  form: FormGroup
  @Input() toponimi: Toponimi[]
  @Input() provincie: Provincie[]
  comuneElenco1: Comuni[]
  @Input() codiceContratto: string
  @Output() comuni = new EventEmitter<any>()
  @Output() cap = new EventEmitter<any>()
  @Input() data: any
  @Input() infoClasses: {
    toponimo: boolean, indirizzo: boolean,
    cap: boolean, provincia: boolean, comune: boolean,
    presso: boolean, frazione: boolean, numeroCivico,
    submitted?:boolean
  }
  @Output() sendInformationOnValidityChanges = new EventEmitter<any>()
  readO:boolean=false
  constructor(private cdr: ChangeDetectorRef, private serviziSottoMenu: ServiziSottomenuService, private rootFormGroup: FormGroupDirective,
    private contrattiService:ContrattiService,private informazioniFornituraFormService:InformazioniFornituraService) { }

  ngOnInit(): void {

    this.form = this.rootFormGroup.control
    if (this.codiceContratto) {
      setTimeout(() => {
        if(this.data&&this.data.data){


        this.serviziSottoMenu.visualizzaComuni(this.data.data.provincia.cdProvincia).subscribe((datas: any) => {
          this.comuneElenco1 = datas

         this.form.controls.cdTipoCliente? this.form = new FormGroup({
            indirizzoResidenza: new FormGroup({
              cdToponimo: new FormControl(this.data.data.toponimo.cdToponimo),
              indirizzo: new FormControl(this.data.data.indirizzo),
              numeroCivico: new FormControl(this.data.data.numeroCivico),
              cap: new FormControl(this.data.data.cap),
              cdComune: new FormControl(this.data.data.comune.cdComune),
              cdProvincia: new FormControl(this.data.data.provincia.cdProvincia),
              frazione: new FormControl(this.data.data.frazione),
              presso: new FormControl(this.data.data.presso),
            }),
          }):this.form.controls.modalitaSpedizioneFattura||this.form.controls.cdTipoFornitura?
          this.form = new FormGroup({
            coincide: new FormControl(this.data.data.isCopyOfResidenza),
            cdToponimo: new FormControl(this.data.data.toponimo.cdToponimo),
            indirizzo: new FormControl(this.data.data.indirizzo),
            numeroCivico: new FormControl(this.data.data.numeroCivico),
            cdProvincia: new FormControl(this.data.data.provincia.cdProvincia),
            cdComune: new FormControl(this.data.data.comune.cdComune),
            cap: new FormControl(this.data.data.cap),
            presso: new FormControl(this.data.data.presso),
            frazione: new FormControl(this.data.data.frazione)
          }):''
        })
        setTimeout(()=>{
if (this.data.stato == 'COMPLETO') {
          this.form.disable()
        }
        },500)
      }
      }, 1200)
    }
  }

  visualizzaComuni1(selectCodice: any) {
    const codiceComune = selectCodice.target.value;
    if (codiceComune && codiceComune != '') {
      this.serviziSottoMenu.visualizzaComuni(codiceComune).subscribe((payload: any) => {
        if (payload) {
          this.comuneElenco1 = payload;
        }
      });
    }
  }
  visualizzaCap(codiceComune: any) {
    if(codiceComune.target.value!=""){
       const codice = codiceComune.target.value;
    const comune = this.comuneElenco1.find(
      (comune) => comune.codiceComune == codice
    );
    this.form.controls['indirizzoResidenza']?this.form.controls['indirizzoResidenza'].get('cap').setValue(comune.cap):
    this.form.controls['cap']? this.form.controls['cap'].setValue(comune.cap):
    this.form.controls['indirizzoFornitura']?this.form.controls['indirizzoFornitura'].get('cap').setValue(comune.cap):''
    }else{
      this.form.controls['indirizzoResidenza']?this.form.controls['indirizzoResidenza'].get('cap').setValue(null):
    this.form.controls['cap']? this.form.controls['cap'].setValue(null):
    this.form.controls['indirizzoFornitura']?this.form.controls['indirizzoFornitura'].get('cap').setValue(null):''
    }

this.cdr.markForCheck();

  }
setInfoValidityChanges(a:any){
   setTimeout(()=>{
  this.sendInformationOnValidityChanges.emit(a)
},500)
}
coincideResidenza() {
this.comuneElenco1 = []
    if (this.form.controls['coincide']&&this.form.controls['coincide'].value) {
      this.contrattiService.getIndirizzoResidenza(this.codiceContratto).subscribe((data: any) => {
        this.form.patchValue({
          cdToponimo: data.toponimo.cdToponimo, indirizzo: data.indirizzo, numeroCivico: data.numeroCivico,
          cdProvincia: data.provincia.cdProvincia, cap: data.toponimo.cdToponimo, presso: data.presso, frazione: data.frazione
        });
        this.form.controls['cdToponimo'].disable();
        this.form.controls['indirizzo'].disable();
        this.serviziSottoMenu.visualizzaComuni(data.provincia.cdProvincia).subscribe((datas: any) => {
          this.comuneElenco1 = datas
          this.form.controls['cdComune'].setValue(data.comune.cdComune)
        })
        this.readO = true;
        this.form.controls['cdProvincia'].disable(); this.form.controls['cdComune'].disable();
      });
    } else if(this.form.controls['coincide']&&!this.form.controls['coincide'].value) {
      this.form.patchValue({
        cdToponimo: null, indirizzo: null, numeroCivico: null, cdProvincia: null,
        cdComune: null, cap: null, presso: null, frazione: null
      });
      this.form.controls['cdToponimo'].enable();
      this.form.controls['indirizzo'].enable();
      this.form.controls['cdProvincia'].enable();
      this.form.controls['cdComune'].enable();
      this.readO = false;
    }else if (this.form.controls['indirizzoFornitura']&&this.form.controls['indirizzoFornitura'].get('coincide').value) {
      this.contrattiService.getIndirizzoResidenza(this.codiceContratto).subscribe((data: any) => {
      this.informazioniFornituraFormService.coincideResidenza(this.form.controls,this.readO,data)
        this.serviziSottoMenu.visualizzaComuni(data.provincia.cdProvincia).subscribe((payload: any) => {
          if (payload) {
            this.comuneElenco1 = payload;
            this.form.controls['indirizzoFornitura'].get('cdComune').setValue(data.comune.cdComune);
          }
        });
      });
    } else if(this.form.controls['indirizzoFornitura']&&!this.form.controls['indirizzoFornitura'].get('coincide').value ) {
      this.informazioniFornituraFormService.coincideResidenza(this.form.controls,this.readO)
    }
    this.form.updateValueAndValidity()
  }
  }
