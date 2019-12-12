import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicDataService } from '../dynamic-data/dynamic-data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchTableService {

  constructor(
    private http: HttpClient,
    private dynamicDataService: DynamicDataService
  ) { }

  getDummyData(searchParams: any = {}): Observable<any> {
    const params = Object.entries(searchParams).map(([key, value]) => `${key}=${value}`).join('&');
    return this.http.get<any>(
      `https://my.api.mockaroo.com/dummy-table-data.json?key=ba1ca290&${params}`
    ).pipe(
      map(
        res => {
          if (searchParams.sorting !== 'static') {
            return {
              data: this.dynamicDataService.generateDynamicData(
                res, searchParams
              ),
              totalItems: res.length
            };
          }

          return {
            data: res,
            totalItems: res.length
          };
        }
      )
    );
  }
}
