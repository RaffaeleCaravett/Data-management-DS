import { AfterViewInit, Component, TemplateRef, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TabellaBolletteService } from './services/tabella-bollette.service';
import { VisualizzaBolletteService } from './services/visualizza-bollette.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table'
import { CustomRendererComponent } from './data-custom-component/data-custom-component.component';
import { CustomDaPagareComponent } from './da-pagare/da-pagare.component';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { deepExtend } from '@nebular/auth';
import { Router } from '@angular/router';
import { FattureNonPagateList } from '../home/home';
import { Paginator } from '../contratti/contratti';

@Component({
  selector: 'ngx-bollette',
  templateUrl: './bollette.component.html',
  styleUrls: ['./bollette.component.scss']
})
export class BolletteComponent implements AfterViewInit {

  @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  dataInizio: string;
  dataFine = new Date().toISOString();
  source: LocalDataSource = new LocalDataSource();
  pageSize = 5
  data = [];
  options = {}
  fattureNonPagateList: FattureNonPagateList[];
  dataSource = new MatTableDataSource<FattureNonPagateList>();
  isPagerDisplay: true;
  isAllSelected: boolean = false;


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.fattureNonPagateList);
  }
  settings = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      custom: [

        {
          name: 'view',
          title: '<span [routerLink]="[`visualizza` ,{{source.id}}]" class="material-symbols-outlined position-absolute top-50 start-100 text-primary" >visibility</span> ',
        },
        {
          name: 'download',
          title: '<span (click)="onDownload({{source.id}})" class="material-symbols-outlined position-absolute top-50 end-0 text-primary">download</span> ',
        },
      ],
      position: 'left'

    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
      },
      statoFattura: {
        title: 'Stato fattura',
        type: 'string',
      },
      indirizzoFatturazione: {
        title: 'Indirizzo fatturazione',
        type: 'string',
      },
      codiceSito: {
        title: 'Codice sito',
        type: 'string',
      },
      dataEmissione: {
        title: 'Data emissione',
        type: 'custom',
        renderComponent: CustomRendererComponent,
        filter: {
          type: 'custom',
          component: CustomFilterComponent
        },

      },
      dataScadenza: {
        title: 'Data scadenza',
        type: 'custom',
        renderComponent: CustomRendererComponent,
        filter: {
          type: 'custom',
          component: CustomFilterComponent
        }
      },
      daPagare: {
        title: 'Da pagare',
        type: 'custom',
        renderComponent: CustomDaPagareComponent,
      },
    }
  }

  onCustom(event) {
    if (event.action == "download") {
      this.downloadBollette.downloadBollette(parseInt(`${event.data.id}`)).subscribe(
      )
    }
    else {
      this.router.navigate(['bollette/visualizza', `${event.data.id}`])
    }
  }


  constructor(public fattureNonPagate: TabellaBolletteService, private downloadBollette: VisualizzaBolletteService, private service: SmartTableData, private router: Router
  ) {

    const data = this.service.getData();
    const date1 = new Date();
    date1.setMonth(date1.getMonth() - 36);
    this.dataInizio = date1.toISOString();

    fattureNonPagate.fattureNonPagate().subscribe(
      (payload: FattureNonPagateList[]) => {
        if (payload) {
          this.fattureNonPagateList = payload;
          this.source.load(payload);
          this.dataSource = new MatTableDataSource<any>(this.fattureNonPagateList);
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

  tableClass: string;
  tableId: string;
  isHideHeader: boolean;
  isHideSubHeader: boolean;
  rowClassFunction: Function;
  defaultSettings: Object = {
    mode: 'inline',
    selectMode: 'single',
    selectedRowIndex: 0,
    switchPageToSelectedRowPage: false,
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    add: {
      inputClass: '',
      addButtonContent: 'Add New',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: false,
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: false,
    },
    attr: {
      id: '',
      class: '',
    },
    noDataMessage: 'No data found',
    columns: {},
    pager: {
      display: true,
      page: 1,
      perPage: 10,
    },
    rowClassFunction: () => '',
  };
  prepareSettings(): Object {
    return deepExtend({}, this.defaultSettings, this.settings);
  }
  changePage($event: any) {
    this.resetAllSelector();
  }
  sort($event: any) {
    this.resetAllSelector();
  }
  filter($event: any) {
    this.resetAllSelector();
  }
  private resetAllSelector() {
    this.isAllSelected = false;
  }

}
