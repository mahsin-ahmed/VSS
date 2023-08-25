import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginesizeComponent } from './enginesize.component';

describe('EnginesizeComponent', () => {
  let component: EnginesizeComponent;
  let fixture: ComponentFixture<EnginesizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnginesizeComponent]
    });
    fixture = TestBed.createComponent(EnginesizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
