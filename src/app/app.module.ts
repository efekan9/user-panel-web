import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiService } from './services/api.service';
import { AppService } from './services/app.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptorService } from './services/app-http-interceptor.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AddUserDialogComponent } from './users/add-user-dialog/add-user-dialog.component';
import { MatListModule } from '@angular/material/list';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    UsersComponent,
    ProfileComponent,
    DashboardComponent,
    AddUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatListModule,
    SimpleNotificationsModule.forRoot(
      {
        timeOut: 5000,
        showProgressBar: true,
      }
    )
  ],
  entryComponents: [
    AddUserDialogComponent
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService,
      multi: true
    },
    AppService,
    ApiService,
    AuthenticationGuardService,
    GuestGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
