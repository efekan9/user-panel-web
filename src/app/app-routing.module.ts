import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'panel',
    component: DashboardComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
