import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorereqComponent } from './storereq.component';

describe('StorereqComponent', () => {
  let component: StorereqComponent;
  let fixture: ComponentFixture<StorereqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorereqComponent]
    });
    fixture = TestBed.createComponent(StorereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
