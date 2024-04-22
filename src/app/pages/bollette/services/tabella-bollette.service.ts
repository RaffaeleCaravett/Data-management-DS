import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TabellaBolletteService {

  private getFattureNonPagate=environment.API_URL +'/api/v2/private/getFatture'
  constructor(private http:HttpClient) { }


  fattureNonPagate(){
    return this.http.get<any>(this.getFattureNonPagate,{
    }).pipe(map((fattureList => fattureList.map(fattureNonPagate => {return {id:fattureNonPagate.id, statoFattura:fattureNonPagate.statoFattura,
      indirizzoFatturazione:fattureNonPagate.indirizzoFatturazione,codiceSito:fattureNonPagate.codiceSito,
      dataEmissione:fattureNonPagate.dataEmissione, dataScadenza:fattureNonPagate.dataScadenza,daPagare:fattureNonPagate.importo};
  }))));
}
}
