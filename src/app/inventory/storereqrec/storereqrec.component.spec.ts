import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorereqrecComponent } from './storereqrec.component';

describe('StorerecComponent', () => {
  let component: StorereqrecComponent;
  let fixture: ComponentFixture<StorereqrecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorereqrecComponent]
    });
    fixture = TestBed.createComponent(StorereqrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
