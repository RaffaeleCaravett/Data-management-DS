export interface DettagliContratto {

  clienteResponseDto?: {
    codiceContratto: string,
    dataStipula: Date,
    luogoStipula: string,
    tipoContratto: {
      cdTipoContratto: string,
      dsTipoContratto: string,
      flAttivo: string,
      tipologia: string
    },
    tipoCliente: {
      cdTipoCliente: string,
      dsTipoCliente: string,
      abilitazioneTipoCliente: boolean
    },
    anagrafica: {
      id: number,
      codiceFiscale: string,
      cognome: string,
      idComuneNascita: string,
      dataDal: Date,
      dataNascita: Date,
      dataAl: Date,
      email: string,
      fax: string,
      nome: string,
      partitaIva: string,
      idProvinciaNascita: string,
      ragioneSociale: string,
      telefonoFisso: string,
      telefonoMobile: string,
      tipologiaAnagrafica: string,
      sesso: string,
      emailPec: string,
      cdClienteBilling: string,
      cdTipoOrganizzazione: string,
      latitudine: number,
      longitudine: number,
      codiceDestinatario: string,
      dmMigrated: boolean,
      indirizzoResidenza: {
        id: number,
        toponimo: {
          cdToponimo: string,
          dsToponimo: string
        },
        indirizzo: string,
        numeroCivico: string,
        cap: string,
        comune: {
  cdComune: string,
          altitudine: number,
          coefficienteC: number,
          dsComune: string,
          flExCassaMezz: string,
          gradiGiorno: number,
          zonaClimatica: string,
          provincia: {
            cdProvincia: string,
            dsProvincia: string
          },
          codiceIstat: string,
          cap: string
        },
        provincia: {
          cdProvincia: string,
          dsProvincia: string
        },
        frazione: string,
        presso: string,
        isCopyOfResidenza: boolean
      }
    },
    indirizzoResidenza: {
      id: number,
      toponimo: {
        cdToponimo: string,
        dsToponimo: string
      },
      indirizzo: string,
      numeroCivico: string,
      cap: string,
      comune: {
        cdComune: string,
        altitudine: number,
        coefficienteC: number,
        dsComune: string,
        flExCassaMezz: string,
        gradiGiorno: number,
        zonaClimatica: string,
        provincia: {
          cdProvincia: string,
          dsProvincia: string
        },
        codiceIstat: string,
        cap: string
      },
      provincia: {
        cdProvincia: string,
        dsProvincia: string
      },
      frazione: string,
      presso: string,
      isCopyOfResidenza: boolean
    },
    statoContratto: string
  },
  pagamentoResponseDto?: {
    indirizzoFatturazione: {
      id: number,
      toponimo: {
        cdToponimo: string,
        dsToponimo: string
      },
      indirizzo: string,
      numeroCivico: string,
      cap: string,
      comune: {
        cdComune: string,
        altitudine: number,
        coefficienteC: number,
        dsComune: string,
        flExCassaMezz: string,
        gradiGiorno: number,
        zonaClimatica: string,
        provincia: {
          cdProvincia: string,
          dsProvincia: string
        },
        codiceIstat: string,
        cap: string
      },
      provincia: {
        cdProvincia: string,
        dsProvincia: string
      },
      frazione: string,
      presso: string,
      isCopyOfResidenza: boolean
    },
    tipoInvio: {
      cdTipoInvio: string,
      dsTipoInvio: string
    },
    tipoPagamento: {
      cdTipoPagamento: string,
      dsTipoPagamento: string,
      ggRitardoInteressi: number
    },
    email: string,
    codiceFiscale: string,
    nome: string,
    cognome: string,
    iban: string,
    statoContratto: string,
    isCopyOfAnagrafica: boolean
  },
  fornituraResponseDto?: {
    tipoFornitura: {
      cdTipoFornitura: string,
      dsTipoFornitura: string
    },
    pdr: string,
    volumeMcAnnuo: number,
    tipologiaUtenza: {
      id: number,
      business: string,
      descrizione: string
    },
    tipoUtilizzo: {
      cdTipoUtilizzo: string,
      dsTipoUtilizzo: string
    },
    categotriaUso: {
      cdCategoriaUso: string,
      dsCategoriaUso: string
    },
    tipoAccise: {
      cdTipoAccisa: string,
      descrizione: string
    },
    accisaAgevolata: {
      cdAccisaAgevolata: string,
      descrizione: string
    },
    flagLicenzaOfficina: boolean,
    matricolaContatore: string,
    tipoContatore: {
      cdTipoContatore: string,
      classe: string,
      portataMax: number,
      portataMin: number,
      portataNominale: number
    },
    correttoreMisuraVolumi: {
      cdCorrettoreMisuraVolumi: string,
      descrizione: string
    },
    distributore: {
      cdDistributore: string,
      dsDistributore: string,
      partitaIva: string,
      rapportoDiretto: string,
      snumeroVerde: string
    },
    classePrelievo: {
      cdClassePrelievo: string,
      giorni: number,
      note: string
    },
    clienteDiretto: {
      cdClienteDiretto: string,
      descrizione: string
    },
    tipologiaOfferta: {
      cdTipoOfferta: string,
      dsTipoOfferta: string
    },
    idListino: number,
    mercatoProvenienza: {
      idTipoMercato: number,
      descrizione: string,
      tipoFornitura: string
    },
    fornitoreUscente1: {
      idFornitore: number,
      nome: string,
      indirizzo: string,
      cap: string,
      comune: string,
      idProvincia: string,
      sitoWeb: string,
      gestioneRecessi: string,
      idToponimo: string,
      numerocivico: string,
      idTipoMercatoLuce: number,
      emailPecGas: string,
      emailPec: string,
      partitaIva: string,
      idTipoMercatoGas: number
    },
    fornitoreUscente2: number,
    dataInizioPrevista: Date,
    flagProvvigionale: boolean,
    mesiRecesso: number,
    switchDiretto: boolean,
    resellerSwitch: {
      id: number,
      descrizione: string,
      partitaIva: string,
      idTracciatoSwitch: number
    },
    stato: {
      id: number,
      descrizione: string,
      tipologia: string,
      valido: boolean
    },
    indirizzoFornitura: {
      id: number,
      toponimo: {
        cdToponimo: string,
        dsToponimo: string
      },
      indirizzo: string,
      numeroCivico: string,
      cap: string,
      comune: {
        cdComune: string,
        altitudine: number,
        coefficienteC: number,
        dsComune: string,
        flExCassaMezz: string,
        gradiGiorno: number,
        zonaClimatica: string,
        provincia: {
          cdProvincia: string,
          dsProvincia: string
        },
        codiceIstat: string,
        cap: string
      },
      provincia: {
        cdProvincia: string,
        dsProvincia: string
      },
      frazione: string,
      presso: string,
      isCopyOfResidenza: boolean
    },
    statoContratto: string,
    matricolaConvertitore: string,
    isCopyOfResidenza: boolean,
    cremi: {
      cdRemi: string,
      dataAttivazione:Date,
      cdGsDistributore: string
    }

}
}
export interface indirizzoResidenza{
  id: number,
  toponimo: {
    cdToponimo: string,
    dsToponimo: string
  },
  indirizzo: string,
  numeroCivico: string,
  cap: string,
  comune: {
    cdComune: string,
    altitudine: number,
    coefficienteC: number,
    dsComune: string,
    flExCassaMezz: string,
    gradiGiorno: number,
    zonaClimatica: string,
    provincia: {
      cdProvincia: string,
      dsProvincia: string
    },
    codiceIstat: string,
    cap: string
  },
  provincia: {
    cdProvincia: string,
    dsProvincia: string
  },
  frazione: string,
  presso: string,
  isCopyOfResidenza: boolean
}

export interface AnagraficaClienteRicerca {

id: number,
codiceFiscale: string,
cognome: any,
idComuneNascita: any,
dataDal: any,
dataNascita: any,
dataAl: any,
email: string,
fax: any,
nome: any,
partitaIva: string,
idProvinciaNascita: any,
ragioneSociale: string,
telefonoFisso:string,
telefonoMobile: string,
tipologiaAnagrafica: any,
sesso: any,
emailPec: string,
cdClienteBilling?: any,
cdTipoOrganizzazione: string,
latitudine: any,
longitudine: any,
codiceDestinatario: string,
dmMigrated: boolean,
indirizzoResidenza: {
id: number,
toponimo: {
cdToponimo: string,
dsToponimo: string
},
indirizzo: string,
numeroCivico: string,
cap: string,
comune: {
cdComune: string,
altitudine?: any,
coefficienteC?: any,
dsComune: string,
flExCassaMezz?: any,
gradiGiorno?: any,
zonaClimatica?: any,
provincia: {
cdProvincia: string,
dsProvincia: string
},
codiceIstat: string,
cap: any
},
provincia: {
cdProvincia: string,
dsProvincia: string
},
frazione: string,
presso: string,
isCopyOfResidenza?: boolean
}
}
