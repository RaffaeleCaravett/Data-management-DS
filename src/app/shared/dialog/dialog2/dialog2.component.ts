import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component implements OnInit {
dateForm!:FormGroup
closeVariable:boolean=false


constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}


indietro():void{
 this.dialogRef.close(this.closeVariable=true)
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

this.dateForm= new FormGroup({
        dataMancante: new FormControl()
      })
    if(!this.data){
setTimeout(()=>{
    this.onNoClick()
  },2000)
    }
  }


}
