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
import { ErrorComponent } from './components/error/error.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // Landing Page Routing
  { path: '', component: AppComponent },

  //common routing paths
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },

  //manager module routing paths
  // {path : 'manager/home', component: HomeComponent},
  {path : 'manager', component: ManagerNavbarComponent},
  {path : 'manager/view-requirement', component: ManagerViewRequirementComponent},
  {path : 'manager/add-requirement', component: ManagerAddRequirementComponent},
  {path : 'manager/add-requirement/:id', component: ManagerAddRequirementComponent},
  {path : 'manager/view-candidate', component: ManagerViewCandidateComponent},

  //recruiter module routing paths
  // {path : 'recruiter/home', component: HomeComponent},
  {path : 'recruiter', component: RecruiterNavbarComponent},
  {path : 'recruiter/getAllCandidates', component: RecruiterViewCandidateComponent},
  {path : 'recruiter/addCandidate', component: RecruiterAddCandidateComponent},
  {path : 'recruiter/addCandidate/:id', component: RecruiterAddCandidateComponent},
  {path: 'recruiter/getAllRequirements', component: RecruiterViewRequirementComponent},

  //error component routing
  {path : '**' , component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
