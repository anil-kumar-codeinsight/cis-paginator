import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CISSearchTabelActions, CISSearchTableColumn, CISSearchTableField } from './cis-search-table.model';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CISPaginatorComponent } from '../paginator/cis-paginator.component';
import { Sort, MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';

export enum SORTING {
  DYNAMIC = 'dynamic',
  STATIC = 'static'
}

@Component({
  selector: 'cis-search-table',
  templateUrl: './cis-search-table.component.html',
  styleUrls: ['./cis-search-table.component.scss']
})
export class CISSearchTableComponent implements OnInit, OnChanges {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  @Input() heading: string;
  @Input() actions: CISSearchTabelActions;
  @Input() columns: Array<CISSearchTableColumn> = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() quickSearchField: CISSearchTableField;
  @Input() sorting: SORTING = SORTING.STATIC;
  @Input() sortActive = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() multiple: boolean;
  @Input() moreColumns: boolean;
  @Input() paginatorPosition: 'start' | 'center' | 'end' = 'center';

  @Input() selectable: (row) => {};
  @Input() search: (searchFilters) => Observable<any>;

  @ViewChild(CISPaginatorComponent) paginator: CISPaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;

  page: any;
  firstSearchDone = false;
  totalItems: number;
  tableData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public selection: SelectionModel<any> = new SelectionModel<any>(
    this.multiple
  );

  quickSearchForm: FormGroup = this.formBuilder.group({});

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
    if (this.sorting === SORTING.DYNAMIC ||
      (!this.dataSource.data ||
        !this.dataSource.data.length)
    ) {
      this.startSearch(0);
    }
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        if (this.sorting === SORTING.STATIC) {
          this.updateData(this.dataSource.data, this.page);
        } else {
          this.startSearch(this.paginator.pageIndex);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.quickSearchField) {
      this.quickSearchForm = this.formBuilder.group({
        [this.quickSearchField.key]: ''
      });
    }
  }

  quickSearch() {
    if (!Object.values(this.quickSearchForm.controls)
      .find(control => control.invalid)
    ) {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 50;
      this.startSearch(0);
    }
  }

  startSearch(pageIndex: number) {
    const searchFilters = this.getSearchFilters(pageIndex);
    if (!this.firstSearchDone || this.sorting === SORTING.DYNAMIC) {
      this.search(searchFilters).subscribe(res => {
        const data = res.data;
        this.totalItems = res.totalItems;
        this.updateData(data);
        this.firstSearchDone = true;
      });
    } else {
      this.performStaticSearching();
    }

  }

  private getSearchFilters(pageIndex: number) {
    return {
      pageSize: this.paginator.pageSize,
      pageIndex: pageIndex,
      sorting: this.sorting,
      sort: {
        active: this.sort.active ? this.sort.active : this.sortActive,
        direction: this.sort.direction ? this.sort.direction : this.sortDirection
      }
    };
  }

  updateData(data: Array<any>, page?: any) {
    this.dataSource.data = data;
    if (this.sorting === SORTING.STATIC) {
      const pageValues = page ? page : {
        startIndex: 0,
        endIndex: this.paginator.pageSize
      };

      if (this.sort.active && this.sort.direction) {
        this.sortData(data);
      }

      this.tableData.data = data.slice(
        pageValues.startIndex,
        pageValues.endIndex,
      );
    } else {
      this.tableData.data = data;
    }
  }

  performStaticSearching() {
    const searchParams: any =
      [
        ...Object.entries(this.quickSearchForm.controls)
      ]
        .filter(([key, control]) => control.value)
        .reduce(
          (acc, [key, control]) => ({
            ...acc,
            [key]: Array.isArray(control.value)
              ? control.value.join(',')
              : control.value.trim
                ? control.value.trim()
                : control.value
          }),
        );
    const data = this.dataSource.data.filter(data => data);
  }

  select(row: any) { }

  private onPageChange(page: any) {
    this.page = page;
    if (this.sorting === SORTING.STATIC) {
      this.updateData(this.dataSource.data, page);
    } else {
      this.startSearch(page.pageIndex);
    }
  }

  private sortData(data: Array<any>) {
    const sort = this.sort;
    data.sort((a, b) => {
      let order: number = 0;
      const aSort = a[sort.active];
      const bSort = b[sort.active];

      if (typeof aSort === 'string' && typeof bSort === 'string') {
        order = aSort.localeCompare(bSort);
      } else if (isNaN(aSort) || isNaN(bSort)) {
        order = aSort > bSort ? 1 : aSort < bSort ? -1 : 0;
      } else {
        order = aSort - bSort;
      }

      return sort.direction === 'asc' ? order : -order;
    });
  }
}
