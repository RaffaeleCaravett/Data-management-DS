import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Profile } from './profile';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profilo:Profile
  chiaro: boolean;
  scuro: boolean;
  update:boolean
  updateForm:FormGroup

  constructor(private profile:ProfileService) { }

  ngOnInit(): void {
this.profile.visualizzaProfilo().subscribe((data:any)=>{
  this.profilo = data
console.log(this.profilo)})
    this.chiaro=true
    this.update=false


    this.updateForm= new FormGroup({
      nome:new FormControl(),
      cognome:new FormControl(),
      utenze:new FormControl(),
      immagineProfilo:new FormControl("../../assets/img/photo.jpg"),
      immagineCopertina:new FormControl("../../../assets/img/CopertinaFB.jpg"),
      indirizzo:new FormControl(),
      allaccio:new FormControl(),
      codiceSito:new FormControl(),
      tipoContratto:new FormControl(),
      descrizione:new FormControl()
    })
  }

  light(){
   this.scuro=false
   this.chiaro=true
  }
  dark(){
    this.scuro=true
    this.chiaro=false
  }

  Submit(){
    console.log(this.updateForm.value)
    this.update=false
    this.chiaro=true
    this.profile.aggiornaIndirizzo(this.updateForm.value).subscribe((data:any)=>{
      this.profilo = data
      console.log(this.profilo)
  })
}
}
