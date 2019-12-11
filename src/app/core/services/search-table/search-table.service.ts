import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTableService {

  constructor(
    private http: HttpClient
  ) { }

  getDummyData(searchParams: any = {}): Observable<any> {
    searchParams = Object.entries(searchParams).map(([key, value]) => `${key}=${value}`).join('&');
    return this.http.get<any>(`https://my.api.mockaroo.com/dummy-table-data.json?key=ba1ca290&${searchParams}`);
  }
}
