import { NgModule } from '@angular/core';
import { CISPaginatorComponent } from 'src/app/paginator/cis-paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CISPaginatorComponent
  ],
  exports: [CISPaginatorComponent]
})
export class CISPaginatorModule { }
