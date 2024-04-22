import { InteractivityChecker } from "@angular/cdk/a11y"

export interface TipologiaUtenza{
    id: number,
    business: string,
    descrizione: string
}

export interface TipoFornitura {
    cdTipoFornitura: string,
    dsTipoFornitura: string
}

export interface TipiContatore {
    cdTipoContatore: string,
    classe: string,
    portataMax: number,
    portataMin: number,
    portataNominale: number
}

export interface TipiUtilizzo{
    cdTipoUtilizzo: string,
    dsTipoUtilizzo: string
}

export interface CabineRemi {
    cdRemi: string,
    dataAttivazione: Date,
    cdGsDistributore: string
}

export interface Distributori {
    cdDistributore: string,
    dsDistributore: string,
    partitaIva: string,
    rapportoDiretto: string,
    snumeroVerde: string
}

export interface CategoriaUso {
    cdCategoriaUso: string,
    dsCategoriaUso: string
}

export interface ClassiPrelievo {
    cdClassePrelievo: string,
    giorni: number,
    note: string
}

export interface TipiOfferta {
    cdTipoOfferta: string,
    dsTipoOfferta: string
}
export interface Listini {
    
    id: number,
    dsContratto: string,
    standard: boolean,
    tipoFornitura: string,
    tipologia: {
      cdTipoOfferta: string,
      dsTipoOfferta: string
    },
    opzioneTariffaria: string,
    prezzoF0: number,
    prezzoF1: number,
    prezzoF2: number,
    prezzoF3: number,
    validoDale: Date,
    validoAl: Date,
    qvdDomestico: number,
    qvdAltriUsi: number,
    qvdVariabile: number
} 
export interface TipiMercato{
        idTipoMercato: number,
        descrizione: string,
        tipoFornitura: string
}

export interface Resellers{
    id: number,
    descrizione: string,
    partitaIva: string,
    idTracciatoSwitch: number
}

export interface Stati {
    id: number,
    descrizione: string,
    tipologia: string,
    valido: boolean
}

export interface Fornitori {
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
}

export interface accisaAgevolata{
    cdAccisaAgevolata: string,
    descrizione: string
}
export interface Accise {
    cdTipoAccisa: string,
    descrizione: string
}

export interface Diretto {
    cdClienteDiretto: string,
    descrizione: string
}

export interface Fornitori {
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
}
export interface Correttori {
    cdCorrettoreMisuraVolumi: string,
    descrizione: string
}