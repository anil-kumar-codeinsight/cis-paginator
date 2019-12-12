import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTableService } from '../search-table/search-table.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicDataService {

    constructor() { }

    generateDynamicData(data: Array<any>, params: any = {}): Array<any> {
        const pageIndex = params.pageIndex ? params.pageIndex : 0;
        const pageSize = params.pageSize ? params.pageSize : 5;
        const startIndex = pageSize * pageIndex;
        const endIndex = Math.min((startIndex + pageSize), data.length);

        data.sort((a, b) => {
            let order: number = 0;
            const aSort = a[params.sort.active];
            const bSort = b[params.sort.active];

            if (typeof aSort === 'string' && typeof bSort === 'string') {
                order = aSort.localeCompare(bSort);
            } else if (isNaN(aSort) || isNaN(bSort)) {
                order = aSort > bSort ? 1 : aSort < bSort ? -1 : 0;
            } else {
                order = aSort - bSort;
            }

            return params.sort.direction === 'asc' ? order : -order;
        });

        return data.slice(startIndex, endIndex);
    }
}
