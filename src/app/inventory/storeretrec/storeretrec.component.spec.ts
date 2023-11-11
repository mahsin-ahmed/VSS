import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreretrecComponent } from './storeretrec.component';

describe('StoreretrecComponent', () => {
  let component: StoreretrecComponent;
  let fixture: ComponentFixture<StoreretrecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreretrecComponent]
    });
    fixture = TestBed.createComponent(StoreretrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
