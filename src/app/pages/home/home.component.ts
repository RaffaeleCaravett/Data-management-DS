import { AfterViewInit, Component, EventEmitter, OnInit, Output,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { GraficiService } from './services/grafici.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as echarts from 'echarts';
import { Columns, Consumi, Costi, FattureNonPagateList, LetturaMessaggio, Options, Options1 } from './home';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'numero', 'dataEmissione', 'dataScadenza', 'daPagare'];
  displayedColumns1: string[] = ['matricola', 'dataScadenza', 'prezzo'];
  dataSource = new MatTableDataSource<FattureNonPagateList>();
  dataSource1 = new MatTableDataSource<LetturaMessaggio>();
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  @ViewChild('MatPag') paginator: MatPaginator;
  @ViewChild('MatPag1') paginator1: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataInizio: string;
  dataFine = new Date().toISOString();
  matrContatore: string;
  dataScadenza: string;
  prezzo: number;
  fattureNonPagateList: FattureNonPagateList[];
  single: any[];
  costi: Costi[];
  consumi: Consumi[];
  colmns: Columns;
  columns: Columns[];
  @Output() ultimiConsumi = new EventEmitter();
  letturaMessaggio: LetturaMessaggio[];
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  consumoLabel: string[]=[]
  consumoData:number[]=[]
  costiLabel:Date[]=[]
  costiData:Number[]=[]
  options: Options
  options1: Options1

  constructor(private consumi1: GraficiService, private costi1: GraficiService, 
    public fattureNonPagate: GraficiService, private letturaMessaggio1: GraficiService) {
    const date1 = new Date();
    date1.setMonth(date1.getMonth() - 36);
    this.dataInizio = date1.toISOString();


    consumi1.graficoConsumi(this.dataInizio, this.dataFine).subscribe(
      (payload: Consumi[]) => {
        if (payload) {
          payload.forEach(x => {
            this.consumi = payload;
            this.consumoLabel.push(x.name)
            this.consumoData.push(x.value)
          })
        }
      });

    costi1.graficoCosti(this.dataInizio, this.dataFine).subscribe(
      (payload: Costi[]) => {
        if (payload) {
          payload.forEach(y => {
            this.costi = payload;
            this.costiLabel.push(y.periodo)
            this.costiData.push(y.costo)
          })
        }
      })


    letturaMessaggio1.letturaMessaggio(this.matrContatore, this.dataScadenza, this.prezzo).subscribe(
      (payload: LetturaMessaggio[]) => {
        if (payload) {
          this.colmns = { key: 'matrContatore', title: "matrContatore" },
            { key: 'dataScadenza', title: 'dataScadenza' },
            { key: 'prezzo', title: 'prezzo' }
          this.letturaMessaggio = payload;
          this.dataSource1 = new MatTableDataSource<LetturaMessaggio>(this.letturaMessaggio)
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.paginator.pageSizeOptions = [2, 4, 6]
          this.dataSource1.paginator.pageSize = 2
        }
      })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'id', title: "id" },
      { key: 'numero', title: 'numero' },
      { key: 'dataEmissione', title: 'dataEmissione' },
      { key: 'dataScadenza', title: 'dataScadenza' },
      { key: 'daPagare', title: 'daPagare' }
    ]

    this.fattureNonPagate.fattureNonPagate(this.dataInizio, this.dataFine).subscribe(
      (payload: FattureNonPagateList[]) => {
        if (payload) {
          this.fattureNonPagateList = payload;
          this.dataSource = new MatTableDataSource<FattureNonPagateList>(payload);
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.pageSizeOptions = [4, 5, 6]
          this.dataSource.paginator.pageSize = 4
          this.dataSource.sort = this.sort
        }
      })
  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
      }
    });
  }
  public onVisibleChange(visible: any): void {
    this.currentVisible = parseInt(visible, 10);
  }
  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }

  ngAfterViewInit() {
    let array1 = [400, 550, 300, 456.6, 851, 350.4, 1050.920, 251.4, 551.52, 451.6, 390, 486.6]
    let array2 = [430, 450, 400, 356.6, 651, 390.4, 850.920, 261.4, 351.52, 751.6, 490, 456.6]
    let array3 = [670, 510, 300, 856.6, 851, 950.4, 2050.920, 651.4, 531.52, 411.6, 310, 416.6]
 this.options = {
      title: {
        text: 'Chart dei consumi'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Consumo', 'Consumo 1', 'Consumo 2', 'Consumo 3']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          name: 'Periodo',
          nameLocation: 'center',
          boundaryGap: false,
          data: this.consumoLabel
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Consumi',
          nameLocation: 'center',
        }
      ],
      series: [
        {
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          name: 'Consumi',
          type: 'line',
          data: this.consumoData,
        },
        {
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          name: 'Consumi 1',
          type: 'line',
          data: array1,
        },
        {
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          name: 'Consumi 2',
          type: 'line',
          data: array2,
        },
        {
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          name: 'Consumi 3',
          type: 'line',
          data: array3,
        }
      ]
    };

    let costiData1 = [350.29, 400.5, 600.22, 425.25, 700, 705.5, 550.22, 715.25]
    let costiData2 = [260.29, 150.5, 500.22, 625.25, 400, 505.5, 650.22, 615.25,]
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 8; i++) {
      xAxisData.push('A' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options1 = {
      title: {
        text: 'Consumi'
      },
      legend: {
        data: ['bar', 'bar2', 'bar3']
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: this.costiData,
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx) {
            return idx * 10;
          }
        },
        {
          name: 'bar2',
          type: 'bar',
          data: costiData1,
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        },
        {
          name: 'bar3',
          type: 'bar',
          data: costiData2,
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }
}












