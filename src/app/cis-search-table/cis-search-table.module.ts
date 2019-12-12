import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { CISSearchTableComponent } from './cis-search-table.component';
import { CISPaginatorModule } from '../paginator/cis-paginator.module';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const modules = [
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
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
