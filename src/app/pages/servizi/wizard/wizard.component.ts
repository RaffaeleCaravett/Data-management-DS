import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiziSottomenuService } from '../serivizi-sottomenu/servizi-sottomenu.service';

@Component({
  selector: 'ngx-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  showWizard1: boolean;
  codiceFornitura: any;
  via: any;
  comune: any;
  cap: any;
  indirizzo: any;
  numeroCivico: any;
  @Output() esci1 = new EventEmitter();
  @Output() event = new EventEmitter();
  @Input() options: any;
  indirizzoAggiornato: any
  myForm: FormGroup;
  auth: any;
  indirizzi1: any;
  provincie: any;
  comuneElenco: any;
  codiceCap: any;
  toponimo: any;
  toponimo1: any;
  provincia: any;
  cdProvincia: any;
  comuni: any;
  valoreModificato: any;
  location:boolean

  constructor(fb: FormBuilder, private router: Router, private readonly aggiornaIndirizzoService: ServiziSottomenuService, private cdr: ChangeDetectorRef,
    private route: Router, private route1: ActivatedRoute) {

    aggiornaIndirizzoService.visualizzaProvincia1().subscribe(
      (payload: any) => {
        if (payload) {
          this.provincia = payload;
          //JSON.parse(payload)
        }
      })

    aggiornaIndirizzoService.visualizzaToponimo1().subscribe(
      (payload: any) => {
        if (payload) {
          this.toponimo1 = payload;
          //JSON.parse(payload)
        }
      })


    aggiornaIndirizzoService.visualizzaToponimo().subscribe(
      (payload: any) => {
        console.log("play")
        console.log(payload)
        if (payload) {
          console.log(payload)
          this.toponimo = payload;
          //JSON.parse(payload)
        }
      })

    aggiornaIndirizzoService.visualizzaProvincie().subscribe(
      (payload: any) => {
        console.log("play")
        console.log(payload)
        if (payload) {
          console.log(payload)
          this.provincie = payload;
          //JSON.parse(payload)
        }
      })



    aggiornaIndirizzoService.indirizziFornitura().subscribe(
      (payload: any) => {
        console.log("play")
        console.log(payload)
        if (payload) {
          console.log(payload)
          this.indirizzi1 = payload;
          //JSON.parse(payload)
        }
      })

    /*aggiornaIndirizzoService.aggiornaIndirizzo(this.codiceFornitura,this.via,this.indirizzo,this.numeroCivico,this.cap,this.comune).subscribe(
      (payload: any) => {
        console.log("play")
        console.log(payload)
        if (payload) {
          console.log(payload)
          this.indirizzoAggiornato = payload;
          //JSON.parse(payload)
        }
      }) QUESTO NON SERVE PERCHè è UNA MODIFICA E DEVE SE MAI INVIARE I DATI ALL'EVENTO DI CLICK E NON RICEVERLI!!!*/

    this.myForm = fb.group({
      provincia: ["", Validators.required],
      comune: ["", Validators.required],
      cap: ["", [Validators.required, Validators.minLength(5)]],
      toponimo: ["", Validators.required],
      indirizzo: ["", Validators.required],
      presso: [""],
      numeroCivico: ["", Validators.required],
    });
  }
  ngOnInit(): void {
 this.location=false
  }
  pippo() {
    this.location=false
    this.showWizard1 = false;
  }

  esci() {

    this.event.emit(true);

  }
  visualizzaComuni(selectCodice: any) {
    const codiceComune = selectCodice.target.value;
    if (codiceComune && codiceComune != '') {
      this.aggiornaIndirizzoService.visualizzaComuni(codiceComune).subscribe(
        (payload: any) => {
          if (payload) {
            this.comuneElenco = payload;
            //JSON.parse(payload)
          }
        })




    } else {
      this.comuneElenco = null;
    }
  }

  riepilogo() {
    this.showWizard1 = true;
    this.valoreModificato = this.myForm.getRawValue();
    const nomeProvincia = this.provincia.find(provincia => provincia.codiceProvincia == this.valoreModificato.provincia)
    this.valoreModificato.provincia = nomeProvincia.descrizioneProvincia;
    console.log(this.myForm.getRawValue());
    this.location=true

    //this.valoreModificato = this.myForm.getRawValue();
    const nomeComune = this.comuneElenco.find(comune => comune.codiceComune == this.valoreModificato.comune)
    this.valoreModificato.comune = nomeComune.nomeComune;


    const toponimo = this.toponimo1.find(toponimo => toponimo.codiceToponimo == this.valoreModificato.toponimo)
    this.valoreModificato.toponimo = toponimo.descrizioneToponimo;

    console.log(this.valoreModificato);

  }
  visualizzaCap(codiceComune: any) {
    console.log(codiceComune.target.value)
    const codice = codiceComune.target.value;
    const comune = this.comuneElenco.find(comune => comune.codiceComune == codice);
    this.codiceCap = comune.cap
    this.cdr.markForCheck();
    console.log(this.codiceCap, codice, comune);

    //Da spiegare perchè a livello di procedimento non ci ho capito un cazzo!

  }
  aggiornaIndirizzo() {
  let indirizzoModificato = Object.assign({},this.myForm.getRawValue())
  if(this.options && this.options.codice){
    indirizzoModificato.codiceFornitura = this.options.codice

  }
    //this.myForm.valid;
    console.log(indirizzoModificato);
    if (this.myForm.valid) {
      this.aggiornaIndirizzoService.aggiornaIndirizzo(indirizzoModificato).subscribe(aggiorna => {

          this.event.emit(true)


      }, error => alert("riepilogo non corretto"))
    }
  }
  /*visualizzaIndirizzo(selectCodice:any){
   const nas = selectCodice.target.value;
   if(codiceComune && codiceComune != ''){

}


  }*/
}
