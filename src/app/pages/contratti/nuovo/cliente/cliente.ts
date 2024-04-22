export interface tipiClientsAbilitati {
    abilitazioneTipoCliente: boolean,
    cdTipoCliente: string,
    dsTipoCliente: string
}

export interface tipiContratto {
    cdTipoContratto: string,
    dsTipoContratto: string,
    flAttivo: string,
    tipologia: string
}

export interface Provincie {
    codiceProvincia: string,
    descrizioneProvincia: string
}

export interface Toponimi {
    codiceToponimo: string,
    descrizioneToponimo: string
}

export interface Comuni {
    cap: any,
    codiceComune:string ,
    codiceIstat:string,
    nomeComune: string
}

export interface AnagraficaCliente {
    
  id?: number,
  codiceFiscale?: string,
  cognome?: string,
  idComuneNascita?: string,
  dataDal?: Date,
  dataNascita?: Date,
  dataAl: Date,
  email?: string,
  fax?: string,
  nome?: string,
  partitaIva?: string,
  idProvinciaNascita?: string,
  ragioneSociale?: string,
  telefonoFisso?: string,
  telefonoMobile?: string,
  tipologiaAnagrafica?: string,
  sesso?: string,
  emailPec?: string,
  cdClienteBilling?: string,
  cdTipoOrganizzazione?: string,
  latitudine?: number,
  longitudine?: number,
  codiceDestinatario?: string,
  dmMigrated?: boolean,
  indirizzoResidenza?: {
    id?: number,
    toponimo?: {
      cdToponimo?: string,
      dsToponimo?: string
    },
    indirizzo?: string,
    numeroCivico?: string,
    cap?: string,
    comune?: {
      cdComune?: string,
      altitudine?: number,
      coefficienteC?: number,
      dsComune?: string,
      flExCassaMezz?: string,
      gradiGiorno?: number,
      zonaClimatica?: string,
      provincia?: {
        cdProvincia?: string,
        dsProvincia?: string
      },
      codiceIstat?: string,
      cap?: string
    },
    provincia?: {
      cdProvincia?: string,
      dsProvincia?: string
    },
    frazione?: string,
    presso?: string,
    isCopyOfResidenza?: boolean
  }
  telefono?:string,
  cellulare?:string

}