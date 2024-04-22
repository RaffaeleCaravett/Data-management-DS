import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ContrattiService {
private postCliente = environment.API_URL_ORDER_ENTRY+'/api/v2/public/createCliente'
private tipiCliente = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiCliente'
private contratti = environment.API_URL_ORDER_ENTRY+'/api/v2/public/ricercaContratti?'
private tipiClienteAbilitati = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiClienteAbilitati'
private tipiContratto = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiContratto'
private tipiPagamento = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiPagamento'
private tipiInvio = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiInvio'
private indirizzoResidenza = environment.API_URL_ORDER_ENTRY+'/api/v2/public/indirizzoResidenza/'
private anagraficaCliente = environment.API_URL_ORDER_ENTRY+'/api/v2/public/anagraficaCliente/'
private postPagamento = environment.API_URL_ORDER_ENTRY+'/api/v2/public/pagamento'
private tipologiaUtenza = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipologieUtenza'
private tipoFornitura = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiFornitura'
private tipoContatore = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiContatore'
private tipoUtilizzo = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiUtilizzo'
private cabinaRemi = environment.API_URL_ORDER_ENTRY+'/api/v2/public/cabineRemiAttive'
private distributori = environment.API_URL_ORDER_ENTRY+'/api/v2/public/distributori'
private categorieUso = environment.API_URL_ORDER_ENTRY+'/api/v2/public/categorieUso'
private classiPrelievo = environment.API_URL_ORDER_ENTRY+'/api/v2/public/classiPrelievo'
private tipiOfferta = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiOfferta'
private listini = environment.API_URL_ORDER_ENTRY+'/api/v2/public/listiniTipologia/'
private tipiMercato = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiMercato'
private resellers = environment.API_URL_ORDER_ENTRY+'/api/v2/public/reseller'
private stati = environment.API_URL_ORDER_ENTRY+'/api/v2/public/stati'
private fornitori = environment.API_URL_ORDER_ENTRY+'/api/v2/public/fornitori'
private informazioniFornitura = environment.API_URL_ORDER_ENTRY+'/api/v2/public/informazioniFornitura'
private ricarcaContratto =environment.API_URL_ORDER_ENTRY+'/api/v2/public/dettagliContratto/'
private getAnagrafica1 = environment.API_URL_ORDER_ENTRY+'/api/v2/public/getAnagrafica/'
private getTipiAllegato = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipiAllegato'
private postAllegato = environment.API_URL_ORDER_ENTRY+'/api/v2/public/caricaAllegato'
private getAllegato = environment.API_URL_ORDER_ENTRY+'/api/v2/public/getAllegati/'
private getStatiContratto = environment.API_URL_ORDER_ENTRY+'/api/v2/public/statiContratto'
private getCMV = environment.API_URL_ORDER_ENTRY+'/api/v2/public/correttoriMisuraVolumi'
private getTipoAcc = environment.API_URL_ORDER_ENTRY+'/api/v2/public/tipoAccise'
private getAccAg = environment.API_URL_ORDER_ENTRY+'/api/v2/public/accisaAgevolate'
private getClienteDirect = environment.API_URL_ORDER_ENTRY+'/api/v2/public/clientiDiretti'

  constructor(private http:HttpClient) {
  }

getContratti(a:number,b:number,body:{}){
return this.http.post(this.contratti+`size=${a}&page=${b}`,body)
}

getTipiCliente(){
return this.http.get(this.tipiCliente)
}
getCliente(url:string){
  return this.http.get(url)
}
insertCliente(body:{}){
  return this.http.post(this.postCliente,body)
}
getTipiClienteAbilitati(){
  return this.http.get(this.tipiClienteAbilitati)
}
getTipiContratto(){
  return this.http.get(this.tipiContratto)
}
getTipiPagamento(){
  return this.http.get(this.tipiPagamento)
}
getTipiInvio(){
  return this.http.get(this.tipiInvio)
}
getIndirizzoResidenza(url:any){
  return this.http.get(this.indirizzoResidenza+url)
}
getAnagraficaCliente(url:any){
  return this.http.get(this.anagraficaCliente+url)
}
postDatiPagamento(body:{}){
  return this.http.post(this.postPagamento,body)
}
getTipiFornitura(){
  return this.http.get(this.tipoFornitura)
}
getTipologieUtenze(){
return this.http.get(this.tipologiaUtenza)
}
getTipiContatore(){
  return this.http.get(this.tipoContatore)
  }
  getTipiUtilizzo(){
    return this.http.get(this.tipoUtilizzo)
    }
    getCabineRemi(){
      return this.http.get(this.cabinaRemi)
    }
    getDistributore(){
      return this.http.get(this.distributori)
    }
    getCategoriaUso(){
      return this.http.get(this.categorieUso)
    }
    getClassePrelievo(){
      return this.http.get(this.classiPrelievo)
    }
    getTipoOfferta(){
      return this.http.get(this.tipiOfferta)
    }
    getListino(url:string){
      return this.http.get(this.listini+url)
    }
    getTipoMercato(){
      return this.http.get(this.tipiMercato)
    }
    getReseller(){
      return this.http.get(this.resellers)
    }
    getStato(){
     return this.http.get(this.stati)
    }
    getFornitore(){
     return this.http.get(this.fornitori)
    }
    postInformazioniFornitura(body:{}){
      return this.http.post(this.informazioniFornitura,body)
    }
    getRicercaContratto(url:string){
      return this.http.get(this.ricarcaContratto+url)
    }

getAnagraficaUno(url:string){
  return this.http.get(this.getAnagrafica1+url)
}
getTipiAllegati(){
  return this.http.get(this.getTipiAllegato)
}
postAllegati(body:{}){
return this.http.post(this.postAllegato,body)
}
getAllegati(string:string){
  return this.http.get(this.getAllegato+string)

}
getStatiContract(){
  return this.http.get(this.getStatiContratto)
}
getCorrettore(){
  return this.http.get(this.getCMV)
}
getTipoAccise(){
  return this.http.get(this.getTipoAcc)
}
getAcciseAgevolate(){
  return this.http.get(this.getAccAg)
}
getClienteDiretto(){
  return this.http.get(this.getClienteDirect)
}
  }
