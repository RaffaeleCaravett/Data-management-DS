import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiziSottomenuService {
  private getIndirizziForniture=environment.API_URL +'/api/v2/private/getIndirizziForniture'
  private getToponimo=environment.API_URL +'/api/v2/private/allToponimi'
  private getComuni=environment.API_URL +'/api/v2/private/allComuni'
  private getProvincia=environment.API_URL +'/api/v2/private/allProvince'
  private putAggiornaIndirizzi=environment.API_URL +'/api/v2/private/aggiornaIndirizzoFatturazione'
  constructor(private http:HttpClient) { }
  
  
  visualizzaComuni1(cdProvincia:any){
    return this.http.post<any>(this.getComuni,{
      cdProvincia:cdProvincia
      
    }).pipe(map((getComuni => getComuni.map(comuni => {return {codiceComune:comuni.codiceComune,
       nomeComune:comuni.nomeComune,codiceIstat:comuni.codiceIstat,cap:comuni.cap};                                                                   
  }))));

}  
  


  visualizzaProvincia1(){
    return this.http.get<any>(this.getProvincia,{
    }).pipe(map((getProvincia => getProvincia.map(provincia => {return {codiceProvincia:provincia.cdProvincia,
       descrizioneProvincia:provincia.dsProvincia};                                                                   
  }))));

}

  visualizzaToponimo1(){
    return this.http.get<any>(this.getToponimo,{
    }).pipe(map((toponomiList => toponomiList.map(toponimi => {return {codiceToponimo:toponimi.cdToponimo,
       descrizioneToponimo:toponimi.dsToponimo};                                                                   
  }))));

}

  visualizzaToponimo(){
    return of([{nome:"Piazza",codice:1234},{nome:"Contrada",codice:12355},{nome:"Via",codice:1282},{nome:"Frazione",codice:1282} ])
  }
  
  
  visualizzaComuni(cdProvincia:any){
    return this.http.get<any>(this.getComuni + '/' + cdProvincia
    
    ).pipe(map((getComuni => getComuni.map(comuni => {return {codiceComune:comuni.codiceComune,
       nomeComune:comuni.nomeComune,codiceIstat:comuni.codiceIstat,cap:comuni.cap};                                                                   
  }))));
    
    
    /*f(codiceComune == 121){
      return of([{nome:"Cosenza",codice:666,cap:'222222'},{nome:"Casole",codice:777,cap:'33333'},{nome:"Pedace",codice:888,cap:'44444'}])
    }
    if(codiceComune == 122){
      return of([{nome:"Alessandria",codice:333,cap:'55555'},{nome:"Varedo",codice:444,cap:'66666'},{nome:"Lodi",codice:555,cap:'77777'}])
    }
    if(codiceComune == 123){
      //return of([{nome:"Monza",codice:121,cap:'88888'},{nome:"Varese",codice:123,cap:'99999'},{nome:"Abbiategrasso",codice:124,cap:'23434'}])
    }*/
  }


  visualizzaProvincie(){
    return of([{nome:"Cosenza",codice:121},{nome:"Milano",codice:123},{nome:"Torino",codice:122}])
  }

  indirizziFornitura(){
    return this.http.get<any>(this.getIndirizziForniture,{
    }).pipe(map((indirizziList => indirizziList.map(indirizzi => {return {indirizzoFornitura:indirizzi.indirizzoFornitura, codice:indirizzi.codice,
                                                                          indirizzoFatturazione:indirizzi.indirizzoFatturazione};
  }))));
 /* return of([
    {
      indirizzoFornitura: "via roma 1",
      codice: 110,
      indirizzoFatturazione: "via milano 2 "
    },
    {
      indirizzoFornitura: "via fra benedetto 24",
      codice: 220,
      indirizzoFatturazione: "via mattia preti 15"
    }
  ])*/
}
aggiornaIndirizzo(form:any){
  return this.http.put<any>(this.putAggiornaIndirizzi,form 
  )
}


}

