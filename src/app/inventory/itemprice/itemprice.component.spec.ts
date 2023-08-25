import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItempriceComponent } from './itemprice.component';

describe('ItempriceComponent', () => {
  let component: ItempriceComponent;
  let fixture: ComponentFixture<ItempriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItempriceComponent]
    });
    fixture = TestBed.createComponent(ItempriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
