import { NgModule } from '@angular/core';
import { CISPaginatorComponent } from 'src/app/paginator/cis-paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
  ],
  declarations: [
    CISPaginatorComponent
  ],
  exports: [CISPaginatorComponent]
})
export class CISPaginatorModule { }
