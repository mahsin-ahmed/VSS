import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupmemberComponent } from './workgroupmember.component';

describe('WorkgroupmemberComponent', () => {
  let component: WorkgroupmemberComponent;
  let fixture: ComponentFixture<WorkgroupmemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkgroupmemberComponent]
    });
    fixture = TestBed.createComponent(WorkgroupmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
