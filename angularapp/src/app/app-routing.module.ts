import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerViewRequirementComponent } from './components/manager-view-requirement/manager-view-requirement.component';
import { ManagerViewCandidateComponent } from './components/manager-view-candidate/manager-view-candidate.component';
import { ManagerAddRequirementComponent } from './components/manager-add-requirement/manager-add-requirement.component';
import { ManagerNavbarComponent } from './components/manager-navbar/manager-navbar.component';
import { RecruiterNavbarComponent } from './components/recruiter-navbar/recruiter-navbar.component';
import { RecruiterViewCandidateComponent } from './components/recruiter-view-candidate/recruiter-view-candidate.component';
import { RecruiterAddCandidateComponent } from './components/recruiter-add-candidate/recruiter-add-candidate.component';
import { RecruiterViewRequirementComponent } from './components/recruiter-view-requirement/recruiter-view-requirement.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './components/authguard/authguard.guard';
import { AuthmGuard } from './components/authguard/authm.guard';

const routes: Routes = [
  // Landing Page Routing
  {path: '', component: AppComponent },

  //common routing paths
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: RegistrationComponent },
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path:'resetPassword/:token',component:ResetPasswordComponent},
  {path: 'home', component: HomeComponent},
  {path:'edit/:id',component: EditProfileComponent},
  
  //manager module routing paths
  // {path : 'manager/home', component: HomeComponent},
  {path : 'manager', component: ManagerNavbarComponent, canActivate: [AuthmGuard]},
  {path : 'manager/view-requirement', component: ManagerViewRequirementComponent, canActivate: [AuthmGuard]},
  {path : 'manager/add-requirement', component: ManagerAddRequirementComponent, canActivate: [AuthmGuard]},
  {path : 'manager/add-requirement/:id', component: ManagerAddRequirementComponent, canActivate: [AuthmGuard]},
  {path : 'manager/view-candidate', component: ManagerViewCandidateComponent, canActivate: [AuthmGuard]},

  //recruiter module routing paths
  // {path : 'recruiter/home', component: HomeComponent},
  {path : 'recruiter', component: RecruiterNavbarComponent, canActivate: [AuthguardGuard]},
  {path : 'recruiter/getAllCandidates', component: RecruiterViewCandidateComponent, canActivate: [AuthguardGuard]},
  {path : 'recruiter/addCandidate', component: RecruiterAddCandidateComponent, canActivate: [AuthguardGuard]},
  {path : 'recruiter/addCandidate/:id', component: RecruiterAddCandidateComponent, canActivate: [AuthguardGuard]},
  {path: 'recruiter/getAllRequirements', component: RecruiterViewRequirementComponent, canActivate: [AuthguardGuard]},

  //error component routing
  {path : '**' , component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
