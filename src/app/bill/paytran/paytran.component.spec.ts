import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytranComponent } from './paytran.component';

describe('PaytranComponent', () => {
  let component: PaytranComponent;
  let fixture: ComponentFixture<PaytranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaytranComponent]
    });
    fixture = TestBed.createComponent(PaytranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
