import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { ManagerAddRequirementComponent } from './manager-add-requirement.component';
import { RequirementService } from 'src/app/services/requirement.service'; // Adjust the path as necessary
import { of } from 'rxjs';

describe('ManagerAddRequirementComponent', () => {
  let component: ManagerAddRequirementComponent;
  let fixture: ComponentFixture<ManagerAddRequirementComponent>;
  let mockRequirementService;

  beforeEach(async () => {
    mockRequirementService = jasmine.createSpyObj(['getRequirementById', 'addRequirement', 'updateRequirement']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ManagerAddRequirementComponent],
      providers: [{ provide: RequirementService, useValue: mockRequirementService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_add_requirement_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_verify_the_existence_of_input_fields_by_placeholder_manager_add_requirement_component', () => {
    const titleInput = fixture.debugElement.query(By.css('input[placeholder="Title"]'));
    const descriptionInput = fixture.debugElement.query(By.css('textarea[placeholder="Description"]'));
    const departmentInput = fixture.debugElement.query(By.css('input[placeholder="Department"]'));
  
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(departmentInput).toBeTruthy();
  });


});
