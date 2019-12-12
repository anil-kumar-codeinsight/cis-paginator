import { Component } from '@angular/core';
import { CISSearchTableColumn, CISSearchTabelActions, CISSearchTableField } from './cis-search-table/cis-search-table.model';
import { SearchTableService } from './core/services/search-table/search-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private searchTableService: SearchTableService
  ) { }

  columns: Array<CISSearchTableColumn> = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'first_name', label: 'First Name', type: 'default' },
    { key: 'last_name', label: 'Last Name', type: 'default' },
    { key: 'email', label: 'Email', type: 'link' },
    { key: 'gender', label: 'Gender', type: 'default' },
    { key: 'dob', label: 'Date of Birth', type: 'date' }
  ];

  actions: Array<CISSearchTabelActions> = [
    {
      label: 'Flat Button',
      type: 'flat',
      tooltip: 'Flat button testing',
      click: () => { },
    },
    {
      label: 'Stroked Button',
      type: 'stroked',
      tooltip: 'Stroked button testing',
      click: () => { },
    },
    {
      label: 'Primary Button',
      tooltip: 'Primary button testing',
      click: () => { },
    }
  ];

  quickSearchField: CISSearchTableField = {
    key: 'searchString',
    label: 'Quick Search'
  }

  search(searchParams: any = {}) {
    return this.searchTableService.getDummyData(searchParams);
  }
}
