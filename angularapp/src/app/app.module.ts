import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerAddRequirementComponent } from './components/manager-add-requirement/manager-add-requirement.component';
import { ManagerNavbarComponent } from './components/manager-navbar/manager-navbar.component';
import { ManagerViewCandidateComponent } from './components/manager-view-candidate/manager-view-candidate.component';
import { ManagerViewRequirementComponent } from './components/manager-view-requirement/manager-view-requirement.component';
import { RecruiterAddCandidateComponent } from './components/recruiter-add-candidate/recruiter-add-candidate.component';
import { RecruiterNavbarComponent } from './components/recruiter-navbar/recruiter-navbar.component';
import { RecruiterViewCandidateComponent } from './components/recruiter-view-candidate/recruiter-view-candidate.component';
import { RecruiterViewRequirementComponent } from './components/recruiter-view-requirement/recruiter-view-requirement.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ManagerAddRequirementComponent,
    ManagerNavbarComponent,
    ManagerViewCandidateComponent,
    ManagerViewRequirementComponent,
    NavbarComponent,
    RecruiterAddCandidateComponent,
    RecruiterNavbarComponent,
    RecruiterViewCandidateComponent,
    RecruiterViewRequirementComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
