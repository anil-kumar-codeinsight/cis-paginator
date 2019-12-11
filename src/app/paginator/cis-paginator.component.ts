import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'cis-pagination',
  templateUrl: './cis-paginator.component.html',
  styleUrls: ['./cis-paginator.component.scss']
})
export class CISPaginatorComponent {
  constructor() { }

  @Input() pageSize = 5;
  @Input() pageSizeOptions: Array<number> = [5, 10, 25, 50, 100];
  @Input() pageOptionsLength = 5;

  @Input() totalItems: number;
  @Input() position: 'start' | 'center' | 'end' = 'center';

  @Input() previousLabel: string;
  @Input() nextLabel: string;

  @Input() hidePageItems: boolean;
  @Input() hidePageSizeOptions: boolean;
  @Input() hideDirectionArrows: boolean;

  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

  public _pageIndex = 0;

  get totalPages(): number {
    return this.totalItems ?
      Math.ceil(this.totalItems / this.pageSize) :
      0;
  }

  get pages(): Array<any> {
    return this.totalPages ?
      Array(this.totalPages).fill(this.totalPages).map((value, index) => index + 1)
      : [];
  }

  get pageItems(): any {
    const pageSize = Number(this.pageSize);
    const start: number = this.pageIndex * pageSize;
    const end = Math.min((start + pageSize), (start + (Number(this.totalItems) - start)));
    return {
      startIndex: start,
      endIndex: end
    };
  }

  get pageRange(): any {
    const range = this.pageOptionsLength;
    const numberOfPages = this.totalPages - 1;
    const pageIndex = this.pageIndex;
    let startIndex = pageIndex - Math.floor(range / 2);
    let endIndex = pageIndex + Math.floor(range / 2);

    if (numberOfPages < 0) {
      return [];
    }

    if (startIndex < 0) {
      endIndex = Math.min(endIndex - startIndex, numberOfPages);
      startIndex = 0;
    }

    if (endIndex > numberOfPages) {
      startIndex = Math.max(startIndex - (endIndex - numberOfPages), 0);
      endIndex = numberOfPages;
    }

    const value = Array(endIndex - startIndex + 1)
      .fill(startIndex)
      .map((item, index) => item + index);

    return value;
  }

  get pageHidden(): any {
    const numberOfPages = this.totalPages - 1;
    return {
      preTenPage: this.pageIndex < 10,
      prePage: this.pageIndex === 0,
      firstPage: this.pageRange.length === 0 || this.pageRange[0] === 0,
      lastPage:
        this.pageRange.length === 0 ||
        this.pageRange[this.pageRange.length - 1] === numberOfPages,
      nextPage: numberOfPages < 0 || this.pageIndex === numberOfPages,
      nextTenPage:
        numberOfPages < 0 || numberOfPages - this.pageIndex < 10
    };
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  set pageIndex(pageIndex: number) {
    this._pageIndex = pageIndex;
  }

  private onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.emitPageChangeEvent();
  }

  private onPageSizeChange() {
    this.pageIndex = 0;
    this.emitPageChangeEvent();
  }

  private emitPageChangeEvent() {
    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: Number(this.pageSize),
      startIndex: this.pageItems.startIndex,
      endIndex: this.pageItems.endIndex
    });
  }
}
