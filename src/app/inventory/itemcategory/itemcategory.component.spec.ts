import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcategoryComponent } from './itemcategory.component';

describe('ItemcategoryComponent', () => {
  let component: ItemcategoryComponent;
  let fixture: ComponentFixture<ItemcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemcategoryComponent]
    });
    fixture = TestBed.createComponent(ItemcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
