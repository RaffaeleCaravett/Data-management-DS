export interface Contratti {
        cdContratto: string,
        ragioneSociale: string,
        cdFiscale: string,
        partitaIva: string,
        cdTipoCliente: string,
        dataStipulaDa: Date,
        dataStipulaA: Date,
        idStatoContratto: number
}

export interface TipiCliente {
        cdTipoCliente: string,
        dsTipoCliente: string,
        abilitazioneTipoCliente: boolean
}

export interface StatiContratto {
        id: number,
        descrizione: string,
        tipologia: string,
        valido: boolean
}
export interface Paginator {
        pageable: any,
        totalElements: number,
        totalPages: number,
        size: number,
        pageSizeOptions: number[],
};

export interface ContrattiRoot {
        content: Contratti[],
        empty: boolean,
        first: boolean,
        last: boolean,
        number: number,
        numberOfElements: 10,
        pageable: {any},
        size: number,
        sort: { sorted: boolean, unsorted: boolean, empty: boolean },
        totalElements: number,
        totalPages: number
}



