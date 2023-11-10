import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupComponent } from './workgroup.component';

describe('WorkgroupComponent', () => {
  let component: WorkgroupComponent;
  let fixture: ComponentFixture<WorkgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkgroupComponent]
    });
    fixture = TestBed.createComponent(WorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
