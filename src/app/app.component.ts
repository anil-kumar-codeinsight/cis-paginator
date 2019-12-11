import { Component } from '@angular/core';
import { CISSearchTableColumn } from './cis-search-table/cis-search-table.model';
import { SearchTableService } from './core/services/search-table/search-table.service';
import { map } from 'rxjs/operators';

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

  search(searchParams: any = {}) {
    return this.searchTableService.getDummyData().pipe(
      map(res => {
        return {
          data: res,
          totalItems: res.length
        };
      }));
  }
}
