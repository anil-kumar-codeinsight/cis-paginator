import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CISSearchTabelActions, CISSearchTableColumn } from './cis-search-table.model';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CISPaginatorComponent } from '../paginator/cis-paginator.component';

@Component({
  selector: 'cis-search-table',
  templateUrl: './cis-search-table.component.html',
  styleUrls: ['./cis-search-table.component.scss']
})
export class CISSearchTableComponent implements OnInit {

  constructor() { }

  @Input() actions: CISSearchTabelActions;
  @Input() columns: Array<CISSearchTableColumn> = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() sorting: 'static' | 'dynamic' = 'static';
  @Input() sortActive = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() multiple: boolean;
  @Input() moreColumns: boolean;

  @Input() selectable: (row) => {};
  @Input() search: (searchFilters) => Observable<any>;

  @ViewChild(CISPaginatorComponent)
  paginator: CISPaginatorComponent;

  totalItems: number;
  tableData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public selection: SelectionModel<any> = new SelectionModel<any>(
    this.multiple
  );

  @Input() rowClass: Function = (row) => { };
  @Input() rowStyle: Function = (row) => { };
  @Input() rowTooltip: Function = (row) => { };

  get displayedColumns() {
    return [
      ...(this.selectable && this.multiple ? ['select'] : []),
      ...this.columns.map(item => item.key),
      ...(this.moreColumns ? ['more'] : [])
    ];
  }

  get showColumnsValue() {
    return this.columns.filter(item => !item.hidden).map(item => item.key);
  }

  ngOnInit() {
    if (this.sorting === 'dynamic' ||
      (!this.dataSource.data ||
        !this.dataSource.data.length)
    ) {
      this.startSearch(0);
    }
  }

  startSearch(pageIndex: number = 0) {
    this.search({}).subscribe(res => {
      const data = res.data;
      this.totalItems = res.totalItems;
      this.updateData(data);
    });
  }

  updateData(data: Array<any>, page?: any) {
    this.dataSource.data = data;
    if (this.sorting === 'static') {
      const pageValues = page ? page : {
        startIndex: 0,
        endIndex: this.paginator.pageSize
      };

      this.tableData.data = data.slice(
        pageValues.startIndex,
        pageValues.endIndex,
      );
    }
  }

  select(row: any) { }

  private onPageChange(page: any) {
    if (this.sorting === 'static') {
      this.updateData(this.dataSource.data, page);
    } else {
      this.startSearch(page.pageIndex);
    }
  }
}
