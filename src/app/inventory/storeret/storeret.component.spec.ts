import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreretComponent } from './storeret.component';

describe('StoreretComponent', () => {
  let component: StoreretComponent;
  let fixture: ComponentFixture<StoreretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreretComponent]
    });
    fixture = TestBed.createComponent(StoreretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
