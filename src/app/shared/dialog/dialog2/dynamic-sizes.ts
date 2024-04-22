import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


export enum DynamicSizes {
   smallWidth='13%',
   smallHeight='22%',
   mediumWidth='23%',
   mediumHeight='35%',
   largeWidth='33%',
   largeHeight='46%'
  }
export class Errors {
  static readonly  invalidFields={ error: { message:'Sembra che alcuni campi siano vuoti o invalidi.'}};
  static readonly  datasNotSatisfies={ error: { message:'I dati che stai inserendo non soddisfano i criteri di ricerca.'}};
  static readonly  notEnoughDocuments={ error: { message:'Sembra che tu non abbia caricato i documenti necessari'}};
  static readonly selectAFile={ error: { message:'Devi selezionare un file per poter caricare'}};
  static readonly emptySearch={ error: { message:'Inserisci qualcosa prima di ricercare'}};
  static readonly alert={ error: { message:'Puoi selezionare solo un indirizzo per volta'}};
  static readonly qualcosaEAndatoStorto={ error: { message:'Qualcosa è andato storto'}};
}

@Injectable({
  providedIn: 'root'
})


export class DynamicDialogSizes {

  constructor() { }

}
