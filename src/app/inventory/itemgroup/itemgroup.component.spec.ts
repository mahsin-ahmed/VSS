import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemgroupComponent } from './itemgroup.component';

describe('ItemgroupComponent', () => {
  let component: ItemgroupComponent;
  let fixture: ComponentFixture<ItemgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemgroupComponent]
    });
    fixture = TestBed.createComponent(ItemgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
