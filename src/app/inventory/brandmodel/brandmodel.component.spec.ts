import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmodelComponent } from './brandmodel.component';

describe('BrandmodelComponent', () => {
  let component: BrandmodelComponent;
  let fixture: ComponentFixture<BrandmodelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandmodelComponent]
    });
    fixture = TestBed.createComponent(BrandmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
