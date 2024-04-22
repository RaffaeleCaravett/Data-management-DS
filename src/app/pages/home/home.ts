export interface FattureNonPagateList {
    daPagare: number
    dataEmissione: Date
    dataScadenza: Date
    id: number
    numero?: any
}
export interface LetturaMessaggio {
    dataScadenza: Date
    message: string
    prezzo: number
}
export interface Costi {
    periodo: Date
    costo: number
}
export interface Consumi {
    name: string
    value: number
}
export interface Options {
    title: { text: string; };
    tooltip: {
        trigger: string;
        axisPointer: {
            type: string;
            label: {
                backgroundColor: string;
            };
        };
    };
    legend: {
        data: string[];
    };
    toolbox: {
        feature:
        {
            saveAsImage: {};
        };
    };
    grid: {
        left: string;
        right: string;
        bottom: string;
        containLabel: boolean;
    };
    xAxis: {
        type: string;
        name: string;
        nameLocation: string;
        boundaryGap: boolean;
        data: string[];
    }[];
    yAxis: {
        type: string;
        name: string;
        nameLocation: string;
    }[];
    series: {
        stack: string;
        areaStyle: {};
        emphasis: {
            focus: string;
        };
        name: string;
        type: string;
        data: number[];
    }[];
};
export interface Options1 {
    title: {
        text: string;
    };
    legend: {
        data: string[];
    };
    toolbox: {
        feature: {
            magicType: {
                type: string[];
            };
            dataView: {};
            saveAsImage: {
                pixelRatio: number;
            };
        };
    };
    tooltip: {};
    xAxis: {
        data: any[];
        splitLine: {
            show: boolean;
        };
    };
    yAxis: {};
    series: {
        name: string;
        type: string;
        data: Number[];
        emphasis: {
            focus: string;
        };
        animationDelay: (idx: any) => number;
    }[];
    animationEasing: string;
    animationDelayUpdate: (idx: any) => number;
};
export interface Columns {
    key: string
    title: string
}