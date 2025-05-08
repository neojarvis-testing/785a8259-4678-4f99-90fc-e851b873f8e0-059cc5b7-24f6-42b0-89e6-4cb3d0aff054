import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_registration_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_Signup_heading_in_the_registration_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Signup');
  });

  fit('Frontend_should_verify_the_existence_of_input_fields_by_placeholder_registration_component', () => {
    const userNameInput = fixture.debugElement.query(By.css('input[placeholder="UserName"]'));
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]'));
    const mobileInput = fixture.debugElement.query(By.css('input[placeholder="Mobile"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[placeholder="Password"]'));
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[placeholder="Confirm Password"]'));
  
    expect(userNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(mobileInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
  });

});
