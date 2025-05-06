import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule , FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_login_component', () => {
    expect(component).toBeTruthy();
  });
  fit('Frontend_should_contain_login_heading_in_the_login_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('LOGIN');
  });
  fit('Frontend_should_verify_the_existence_of_input_fields_by_placeholder_login_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[placeholder="Password"]'));
  
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
  






});
