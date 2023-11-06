import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalepriceComponent } from './saleprice.component';

describe('SalepriceComponent', () => {
  let component: SalepriceComponent;
  let fixture: ComponentFixture<SalepriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalepriceComponent]
    });
    fixture = TestBed.createComponent(SalepriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
