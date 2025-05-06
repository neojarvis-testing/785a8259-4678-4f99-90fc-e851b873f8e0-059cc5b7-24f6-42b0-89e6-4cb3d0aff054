import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerNavbarComponent } from './manager-navbar.component';

describe('ManagerNavbarComponent', () => {
  let component: ManagerNavbarComponent;
  let fixture: ComponentFixture<ManagerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_navbar_component', () => {
    expect(component).toBeTruthy();
  });

});
