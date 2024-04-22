import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ServiziSottomenuService } from '../serivizi-sottomenu/servizi-sottomenu.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from 'app/shared/dialog/dialog2/dialog2.component';
import { ClienteService } from 'app/pages/contratti/nuovo/cliente/cliente.service';
import { DynamicSizes, Errors } from 'app/shared/dialog/dialog2/dynamic-sizes';

@Component({
  selector: 'ngx-modifica-indirizzo',
  templateUrl: './modifica-indirizzo.component.html',
  styleUrls: ['./modifica-indirizzo.component.scss']
})
export class ModificaIndirizzoComponent implements OnInit {
  indirizzi: any;
  showWizard: boolean;
  homeform: FormGroup;
  conta = 0;
  checkboxSelezionata: any;
  forBackground:number
  ngOnInit(): void {
    this.homeform = new FormGroup({
      checkbox: new FormControl()
    })
  }

  ctr(parametro, x,i) {
    if (parametro.checked) {

      this.conta++;
      if (this.conta > 1) {
        this.clienteService.openDialog(
          Errors.alert,
           this.dialog,
          DynamicSizes
        );
        parametro.checked = false;
        this.conta--;
      } else {
        this.forBackground=i
        this.checkboxSelezionata = x;
      }
    } else {
      if (this.conta > 0) {
        this.forBackground=0
        this.conta--;
        this.checkboxSelezionata = null
      }
    }
  }
  modificaIndirizzo() {
    this.showWizard = true;
  }
  backToModifica(attributo: any) {
    if (attributo) {
      this.showWizard = false;
      this.conta = 0;
      this.getIndirizzi()
      this.checkboxSelezionata = null;
    } else {
      this.showWizard = true;
    }
  }
  constructor(private readonly indirizziService: ServiziSottomenuService,private dialog:MatDialog,private clienteService:ClienteService) {
    this.getIndirizzi()
  }
getIndirizzi(){
  this.indirizziService.indirizziFornitura().subscribe(
    (payload: any) => {
      if (payload) {
        this.indirizzi = payload;
      }
    })
}
}


