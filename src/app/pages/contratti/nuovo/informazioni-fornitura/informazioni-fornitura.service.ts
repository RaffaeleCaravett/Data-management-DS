import { Injectable } from '@angular/core';
import { ServiziSottomenuService } from 'app/pages/servizi/serivizi-sottomenu/servizi-sottomenu.service';
import { ContrattiService } from '../../contratti.service';


@Injectable({
    providedIn: 'root',
})
export class InformazioniFornituraService {

    constructor(private serviziSottomenuService: ServiziSottomenuService, private contrattiService: ContrattiService) {

    }
    post(codiceContratto: string, a: any) {
        return {
            cdContratto: codiceContratto,
            cdTipoFornitura: a['cdTipoFornitura'].value,
            pdr: a['pdr'].value,
            volumeMcAnnuo: Number(a['volumeMcAnnuo'].value),
            cdRemi: a['cabinaRemi'].value,
            idTipologiaUtenza: Number(a['tipologiaUtenza'].value),
            cdTipoUtilizzo: a['tipoUtilizzo'].value,
            cdCategotriaUso: a['categoriaUso'].value,
            cdTipoAccisa: a['tipoAccise'].value,
            cdAccisaAgevolata: a['accisaAgevolata'].value,
            flagLicenzaOfficina: a['licenzaOfficina'].value,
            matricolaContatore: a['matricolaContatore'].value,
            cdTipoContatore: a['tipoContatore'].value,
            cdCorrettoreMisuraVolumi: a['correttoreMisuraVolumi'].value,
            cdDistributore: a['distributore'].value,
            cdClassePrelievo: a['classePrelievo'].value,
            cdClienteDiretto: a['clienteDiretto'].value,
            cdTipologiaOfferta: a['condizioniTecnicoEconomiche'].get('tipologiaOfferta').value,
            idListino: Number(a['condizioniTecnicoEconomiche'].get('listino').value),
            idMercatoProvenienza: Number(a['informazioniAggiuntive'].get('mercatoProvenienza').value),
            idFornitoreUscente1: Number(a['informazioniAggiuntive'].get('fornitoreUscente1').value),
            idFornitoreUscente2: Number(a['informazioniAggiuntive'].get('fornitoreUscente2').value),
            dataInizioPrevista: a['informazioniAggiuntive'].get('dataInizioPrevista').value,
            flagProvvigionale: a['informazioniAggiuntive'].get('calcoloProvvigioni').value,
            mesiRecesso: a['informazioniAggiuntive'].get('tempiRecessoMesi').value,
            switchDiretto: a['informazioniAggiuntive'].get('switchDistributore').value,
            idResellerSwitch: Number(a['informazioniAggiuntive'].get('resellerSwitch').value),
            matricolaConvertitore: a['matricolaConvertitore'].value,
            indirizzoFornitura: {
                cdToponimo: a['indirizzoFornitura'].get('cdToponimo').value,
                indirizzo: a['indirizzoFornitura'].get('indirizzo').value,
                numeroCivico: a['indirizzoFornitura'].get('numeroCivico').value,
                cap: a['indirizzoFornitura'].get('cap').value,
                cdComune: a['indirizzoFornitura'].get('cdComune').value,
                cdProvincia: a['indirizzoFornitura'].get('cdProvincia').value,
                frazione: a['indirizzoFornitura'].get('frazione').value || '',
                presso: a['indirizzoFornitura'].get('presso').value || '',
                isCopyOfResidenza: a['indirizzoFornitura'].get('coincide').value
            },
        }
    }
coincideResidenza(a:any,readO:any,b?:any){

    if (a['indirizzoFornitura'].get('coincide').value) {
    a['indirizzoFornitura'].get('cdToponimo').setValue(b.toponimo.cdToponimo);
    a['indirizzoFornitura'].get('indirizzo').setValue(b.indirizzo);
    a['indirizzoFornitura'].get('numeroCivico').setValue(b.numeroCivico);
    a['indirizzoFornitura'].get('cdProvincia').setValue(b.provincia.cdProvincia);
    a['indirizzoFornitura'].get('cap').setValue(b.cap);
    a['indirizzoFornitura'].get('presso').setValue(b.presso);
    a['indirizzoFornitura'].get('frazione').setValue(b.frazione);
    a['indirizzoFornitura'].disable()
    a['indirizzoFornitura'].get('coincide').enable()
    readO = true;}else{
        a['indirizzoFornitura'].reset()
        a['indirizzoFornitura'].enable()
        readO = false;
    }
}


    labelClick(a: any, b: any) {
        if (a == 'licenzaOfficina') {
            !b['licenzaOfficina'].value ? b['licenzaOfficina'].setValue(true) : b['licenzaOfficina'].setValue(false)
        }
        else if (a == 'coincideConResidenza') {
            !b['indirizzoFornitura'].get('coincide').value ? b['indirizzoFornitura'].get('coincide').setValue(true) : b['indirizzoFornitura'].get('coincide').setValue(false)
        }
        else if (a == 'ST' || a == 'AH') {
            b['condizioniTecnicoEconomiche'].get('tipologiaOfferta').setValue(a)
        }
        else if (a == 'calcoloProvvigioni') {
            !b['informazioniAggiuntive'].get('calcoloProvvigioni').value ? b['informazioniAggiuntive'].get('calcoloProvvigioni').setValue(true) : b['informazioniAggiuntive'].get('calcoloProvvigioni').setValue(false)
        }
        else if (a == 'switchDistributore') {
            !b['informazioniAggiuntive'].get('switchDistributore').value ? b['informazioniAggiuntive'].get('switchDistributore').setValue(true) : b['informazioniAggiuntive'].get('switchDistributore').setValue(false)
        }
    }
}
