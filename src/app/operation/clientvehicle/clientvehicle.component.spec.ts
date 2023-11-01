import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientvehicleComponent } from './clientvehicle.component';

describe('ClientvehicleComponent', () => {
  let component: ClientvehicleComponent;
  let fixture: ComponentFixture<ClientvehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientvehicleComponent]
    });
    fixture = TestBed.createComponent(ClientvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
