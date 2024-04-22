import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  visualizzaProfilo(){
    return of  ( [{nome:"Nick", cognome:"Jones", utenze:1, immagineProfilo:"../../assets/img/photo.jpg", immagineCopertina:"../../../assets/img/CopertinaFB.jpg",indirizzo:'Via M. Preti 15',
    allaccio:'Gennaio'+' '+2023,codiceSito:1157896,tipoContratto:"Luce & gas",descrizione:" Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."}])
  }

  aggiornaIndirizzo(form:any){
    return of ([form])
  }

}
