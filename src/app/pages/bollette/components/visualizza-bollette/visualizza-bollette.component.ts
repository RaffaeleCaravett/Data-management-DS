import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { id } from '@swimlane/ngx-charts';
import { delay, takeWhile } from 'rxjs/operators';
import { VisualizzaBolletteService } from '../../services/visualizza-bollette.service';

@Component({
  selector: 'ngx-visualizza-bollette',
  templateUrl: './visualizza-bollette.component.html',
  styleUrls: ['./visualizza-bollette.component.scss']
})
export class VisualizzaBolletteComponent implements OnInit, AfterViewInit,OnDestroy {

  bolletta:any;
  id=1;
  constructor(private routing:Router,private theme: NbThemeService,private visualizzaBollete:VisualizzaBolletteService,
    private route:ActivatedRoute,private downloadBollette1:VisualizzaBolletteService) {

      this.route.params.subscribe (param => {
      this.id = Number(param['id'])

      visualizzaBollete.visualizzaBollette(param['id']).subscribe(
        (payload: any) => {
          if (payload) {
            this.bolletta = payload;
            console.log(this.bolletta)
          }
        });



  })
}
onDownload(id:number){
  this.downloadBollette1.downloadBollette(id).subscribe(

  )

  }

  ngOnInit(): void {
  }
  options: any = {};
  themeSubscription: any;



  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Consumo Rilevato', 'Consumo Fatturato'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Consumi',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value:this.bolletta.consumoRilevato, name: 'Consumo Rilevato' },
              { value: this.bolletta.consumoFatturato, name: 'Consumo Fatturato' },

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
