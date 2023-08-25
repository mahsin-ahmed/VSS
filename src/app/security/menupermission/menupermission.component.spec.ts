import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupermissionComponent } from './menupermission.component';

describe('MenupermissionComponent', () => {
  let component: MenupermissionComponent;
  let fixture: ComponentFixture<MenupermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenupermissionComponent]
    });
    fixture = TestBed.createComponent(MenupermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
