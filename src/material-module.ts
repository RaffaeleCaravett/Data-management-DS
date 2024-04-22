import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table"
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const MaterialComponents = [
MatPaginatorModule,
MatTableModule,
MatSortModule,

]

@NgModule({
  imports:[MaterialComponents,],
  exports:[
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialComponents,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule{

}
