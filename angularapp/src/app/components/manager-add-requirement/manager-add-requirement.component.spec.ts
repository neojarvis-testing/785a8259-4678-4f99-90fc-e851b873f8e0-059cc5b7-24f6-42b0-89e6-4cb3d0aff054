import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddRequirementComponent } from './manager-add-requirement.component';

describe('ManagerAddRequirementComponent', () => {
  let component: ManagerAddRequirementComponent;
  let fixture: ComponentFixture<ManagerAddRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAddRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
