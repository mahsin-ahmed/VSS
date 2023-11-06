import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorerecComponent } from './storerec.component';

describe('StorerecComponent', () => {
  let component: StorerecComponent;
  let fixture: ComponentFixture<StorerecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorerecComponent]
    });
    fixture = TestBed.createComponent(StorerecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
