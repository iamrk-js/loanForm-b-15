import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';
import { ApplyLoanComponent } from './shared/components/apply-loan/apply-loan.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './shared/gaurds/auth.guard';
import { RoleGuard } from './shared/gaurds/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'apply-loan', 
    component: ApplyLoanComponent,
    // canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard, RoleGuard] 
  },
  { 
    path: 'dashboard', 
    component: UserDashboardComponent,
    // canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }