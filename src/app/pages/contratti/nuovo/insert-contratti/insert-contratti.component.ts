import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-insert-contratti',
  templateUrl: './insert-contratti.component.html',
  styleUrls: ['./insert-contratti.component.scss'],

})
export class InsertContrattiComponent implements OnInit {
 
  string: string = '';
  long: number = 0;
  codContratto: string = '';
  visualizzaContratti: boolean;
  spinValue: string;
  color1:string=''


  constructor(
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((param) => {
      if (param.id != undefined) {
        this.visualizzaContratti = true;
        this.codContratto = param.id;
      }
    });
  }

  ngOnInit(): void {
    this.string = 'cliente';
  }

  onActivated(a: string) {
    this.string = a;
  }
  onRiceviSpinnerValue(a: string) {
    this.spinValue = a;
  }
  navbarUpload(a: number) {
    setTimeout(()=>{
 if (a == 25) {
      this.long = a;
    }
    if (a == 50) {
      this.long = a;
    }
    if (a == 75) {
      this.long = a;
    }
    if (a == 100) {
      this.long = a
    }
     this.cdr.detectChanges();
    },1000)
   
  }

navbarUploadColor(a:any){
this.color1=a
}


  onSaveCodiceContratto(a: string) {
    this.codContratto = a;
    this.cdr.detectChanges();
  }
}

