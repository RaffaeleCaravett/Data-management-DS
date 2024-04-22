import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiziSottomenuService } from '../serivizi-sottomenu/servizi-sottomenu.service';

@Component({
  selector: 'ngx-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {
  
  @Output() esci = new EventEmitter();
  @Output() modificaIndirizzo = new EventEmitter<any>();
  @Input() rawValue:any;
  myForm: FormGroup ; 
 
  constructor(fb:FormBuilder,private router:Router,private readonly aggiornaIndirizzoService: ServiziSottomenuService,private cdr: ChangeDetectorRef,private route:Router){
    
  }
  indietro(){
    this.esci.emit(true)
  }
  ngOnInit(): void {
  }
  
aggiornaIndirizzo(){
  this.modificaIndirizzo.emit(true);
  
}
  
}

