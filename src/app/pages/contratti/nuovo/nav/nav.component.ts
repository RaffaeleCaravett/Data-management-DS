import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  @Input() value:number
  @Input() color:string


  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
this.color=''
  }



}




