import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CISSearchTableComponent } from './cis-search-table.component';

describe('CisSearchTableComponent', () => {
  let component: CISSearchTableComponent;
  let fixture: ComponentFixture<CISSearchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CISSearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CISSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
