import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { CISSearchTableComponent } from './cis-search-table.component';
import { CISPaginatorModule } from '../paginator/cis-paginator.module';
import { MatSortModule } from '@angular/material/sort';

const modules = [
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatSelectModule,
  CISPaginatorModule,
]

@NgModule({
  declarations: [CISSearchTableComponent],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    CISSearchTableComponent
  ]
})
export class CISSearchTableModule { }
