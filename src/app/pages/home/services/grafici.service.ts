import { tabellaInterface } from './tabellaInterface';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class GraficiService implements tabellaInterface {

  private getUltimiConsumi= environment.API_URL +'/api/v2/private/getUltimiConsumi'
  private getUltimiCosti=environment.API_URL +'/api/v2/private/getCostoUltimeFatture'
  private getUltimeFatture=environment.API_URL +'/api/v2/private/getFattureNonPagate'
  private getMessage=environment.API_URL +'/api/v2/private/getDashboardMessage'

  constructor(private http:HttpClient) {
   }
  matrContatore: string;
  numero: string;
  dataEmissione: string;
  dataScadenza: string;
  daPagare: number;
  id: number;
  

   graficoConsumi(dataInizio:string,dataFine:string){
     return this.http.post<any>(this.getUltimiConsumi,{
      dataInizio:dataInizio,
      dataFine:dataFine
    }).pipe(map((consumoList => consumoList.map( consumo => {return { name:consumo.periodo, value: consumo.consumo};
  }))));
    }

    graficoCosti(dataInizio:string,dataFine:string){
      return this.http.post<any>(this.getUltimiCosti,{
        dataInizio:dataInizio,
        dataFine:dataFine
      }).pipe(map((costoList => costoList.map(costo => {return {periodo: costo.periodo, costo: costo.costo};
    }))));
  }

  fattureNonPagate(dataInizio:string,dataFine:string){
    return this.http.post<any>(this.getUltimeFatture,{
      dataInizio:dataInizio,
      dataFine:dataFine
    }).pipe(map((fattureList => fattureList.map(fattureNonPagate => {return {id:fattureNonPagate.id, numero:fattureNonPagate.numero, dataEmissione:fattureNonPagate.dataEmissione
    , dataScadenza:fattureNonPagate.dataScadenza,daPagare:fattureNonPagate.daPagare};
  }))));
}

letturaMessaggio(matrContatore:string,dataScadenza:string,prezzo:number){
  return this.http.get<any>(this.getMessage
  ).pipe(map((messageList => messageList.map(message => {return {message:message.matrContatore,dataScadenza:message.dataScadenza,prezzo:message.prezzo};
  }))));
}


}
