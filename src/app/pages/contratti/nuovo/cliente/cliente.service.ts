import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Dialog2Component } from 'app/shared/dialog/dialog2/dialog2.component';
import { DynamicSizes } from 'app/shared/dialog/dialog2/dynamic-sizes';




@Injectable({
  providedIn: 'root',
})
export class ClienteService {
 

  constructor() {
  
  }

  changeTypeClient(cliente:any){
    if (cliente.controls['cdTipoCliente'].value == 'DOM') {
      cliente.controls['anagraficaDto'].get('ricerc').clearValidators()
      cliente.controls['anagraficaDto'].get('partitaIva').clearValidators()
      cliente.controls['anagraficaDto'].get('ragioneSociale').clearValidators()
      cliente.controls['anagraficaDto'].get('cdTipoOrganizzazione').clearValidators()
      cliente.controls['anagraficaDto'].get('codiceDestinatario').clearValidators()
      cliente.controls['anagraficaDto'].get('codiceFiscale').addValidators([Validators.required, Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'),]);
      cliente.controls['anagraficaDto'].get('cognome').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('nome').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('sesso').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('dataNascita').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('provinciaNascita').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('comuneNascita').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('ricerc').addValidators(Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'));
      cliente.controls['anagraficaDto'].get('email').addValidators(Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
      cliente.controls['anagraficaDto'].get('emailPec').addValidators(Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
      cliente.patchValue({
        partitaIva: '',
        ragioneSociale: '',
        cdTipoOrganizzazione: '',
        codiceDestinatario: ''
      });
    } else if (cliente.controls['cdTipoCliente'].value == 'ORG') {
      cliente.controls['anagraficaDto'].get('ricerc').clearValidators();
      cliente.controls['anagraficaDto'].get('ricerc').addValidators(Validators.pattern('^[0-9]{11}$'));
      cliente.controls['anagraficaDto'].get('codiceFiscale').clearValidators()
      cliente.controls['anagraficaDto'].get('cognome').clearValidators()
      cliente.controls['anagraficaDto'].get('nome').clearValidators()
      cliente.controls['anagraficaDto'].get('sesso').clearValidators()
      cliente.controls['anagraficaDto'].get('dataNascita').clearValidators()
      cliente.controls['anagraficaDto'].get('provinciaNascita').clearValidators()
      cliente.controls['anagraficaDto'].get('comuneNascita').clearValidators()
      cliente.controls['anagraficaDto'].get('email').clearValidators()
      cliente.controls['anagraficaDto'].get('emailPec').clearValidators()
      cliente.controls['anagraficaDto'].get('ragioneSociale').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('partitaIva').addValidators([Validators.required, Validators.pattern('^[0-9]{11}$')]);
      cliente.controls['anagraficaDto'].get('cdTipoOrganizzazione').addValidators(Validators.required);
      cliente.controls['anagraficaDto'].get('codiceDestinatario').addValidators(Validators.required);
      cliente.patchValue({
        codiceFiscale: '',
        cognome: '',
        nome: '',
        sesso: '',
        dataNascita: '',
        provinciaNascita: '',
        comuneNascita: ''
      });
    }    
      cliente.controls['anagraficaDto'].updateValueAndValidity()
  }
  cleanField(c:any) {
    c.controls['anagraficaDto'].reset()
    c.controls['anagraficaDto'].get('provinciaNascita').enable();
    c.controls['anagraficaDto'].get('comuneNascita').enable();
    c.controls['anagraficaDto'].get('partitaIva').enable();
    c.controls['anagraficaDto'].get('codiceDestinatario').enable();
    c.controls['anagraficaDto'].get('ragioneSociale').enable();
    c.controls['anagraficaDto'].get('cdTipoOrganizzazione').enable()
  }

  openDialog(err: any,dialog:any,dialog2Service:any,search?:any,substituteErr?: any) {
    const dialogRef = dialog.open(Dialog2Component, {
      width:DynamicSizes.mediumWidth,
      height: DynamicSizes.mediumHeight,
      data: err.error.message || substituteErr.error.message,
      autoFocus: false
    })
    dialogRef.afterClosed().subscribe((data: any) => {
     search = false
    })
  }
  }
