import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualizzaBolletteService {
  private getVisualizzaBollette=environment.API_URL +'/api/v2/private/getDettaglioFattura'
  private getDownload=environment.API_URL +'/api/v2/private/downloadFile'

  constructor(private http:HttpClient) { }
  visualizzaBollette(id:number){
    return this.http.get<any>(this.getVisualizzaBollette
      +'/' + id)
    .pipe(map(((bollette => 
      {return {id:bollette.id, numeroFattura:bollette.numeroFattura, totaleFattura:bollette.totaleFattura, consumoFatturato:bollette.consumoFatturato, consumoRilevato:bollette.consumoRilevato,
    anno:bollette.anno,mese:bollette.mese,codiceSito:bollette.codiceSito,indirizzo:bollette.indirizzoFatturazione,tipoFattura:bollette.tipoFattura};
  }))));
  /*return of( {id:121, numero:1, totaleFattura:200.2, consumoFatturato:30.5, consumoRilevato:19.7,indirizzo:'Via Mattia Preti 15',tipoFattura:'Gas',
    anno:2023,mese:'gennaio',codiceSito:1157896})*/
    
}
downloadBollette(id:number){
  return this.http.get(this.getDownload + "/" + id, 
  {responseType: 'blob'}).pipe(tap((response) => this.doDownload(response, 'bolletta' + id, 'pdf')));
  
}
doDownload(response: any, fileName: string, typeOfFile: string) {
  const newBlob = new Blob([response], {type: `application/${typeOfFile}`});

  // IE doesn't allow using a blob object directly as link href

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);

  const link = document.createElement('a');
  link.href = data;
  link.download = `${fileName}.${typeOfFile}`;
  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

  setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
  }, 100);
}
   
}
