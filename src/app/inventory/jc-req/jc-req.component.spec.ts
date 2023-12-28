import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JcReqComponent } from './jc-req.component';

describe('JcReqComponent', () => {
  let component: JcReqComponent;
  let fixture: ComponentFixture<JcReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JcReqComponent]
    });
    fixture = TestBed.createComponent(JcReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
