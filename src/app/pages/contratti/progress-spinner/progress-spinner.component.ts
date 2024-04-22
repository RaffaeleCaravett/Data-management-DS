import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProgressSpinnerService } from './progress-spinner.service';


@Component({
  selector: 'ngx-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit,OnDestroy {


  @Output() activated = new EventEmitter<string>()


  showSpinner = false;
 
  constructor(private spinnerService: ProgressSpinnerService ,private cdRef: ChangeDetectorRef) {

  }
  ngOnDestroy(): void {
   

  }

  ngOnInit() {
    
  
    this.init();
  }

  init() {
  
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
 
      this.showSpinner = status === 4;
      this.cdRef.detectChanges();
    });
  }
}
