import { TestBed } from '@angular/core/testing';

import { RequirementService } from './requirement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequirementService', () => {
  let service: RequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(RequirementService);
  });

  fit('Frontend_should_create_requirement_service', () => {
    expect(service as any).toBeTruthy();
  });
  fit('Frontend_requirement_service_should_have_getAllRequirements_method', () => {
    expect((service as any).getAllRequirements).toBeDefined();
  });
  fit('Frontend_requirement_service_should_have_addRequirement_method', () => {
    expect((service as any).addRequirement).toBeDefined();
  });
});
