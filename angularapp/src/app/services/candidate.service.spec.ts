import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CandidateService', () => {
  let service: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(CandidateService);
  });

  fit('Frontend_should_create_candidate_service', () => {
    expect(service as any).toBeTruthy();
  });
  fit('Frontend_candidate_service_should_have_getAllCandidates_method', () => {
    expect((service as any).getAllCandidates).toBeDefined();
  });
  fit('Frontend_candidate_service_should_have_addCandidate_method', () => {
    expect((service as any).addCandidate).toBeDefined();
  });
});
