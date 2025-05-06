import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
    });
    service = TestBed.inject(AuthService);
  });

  fit('Frontend_should_create_auth_service', () => {
    expect(service as any).toBeTruthy();
  });
  fit('Frontend_auth_service_should_have_register_method', () => {
    expect((service as any).register).toBeDefined();
  });
  fit('Frontend_auth_service_should_have_login_method', () => {
    expect((service as any).login).toBeDefined();
  });
});
