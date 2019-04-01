import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public usernameControl = new FormControl(null, Validators.required);
  public passwordControl = new FormControl(null, Validators.required);
  constructor(private appService: AppService,
    private apiService: ApiService,
    private notifications: NotificationsService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginClick() {
    if (this.usernameControl.valid && this.passwordControl.valid) {
      const loginData = {
        username: this.usernameControl.value,
        password: this.passwordControl.value,
      }
      this.apiService.signIn(loginData).subscribe(res => {
        this.appService.login(res.token);
        this.appService.setUser(res.user);
        this.notifications.success("Success", "Welcome to User Panel!");
      }, error => {
      this.notifications.error(error.type, error.msg);
      })
    } else {
      this.notifications.warn("Warning", "Please fill required fields!");
    }
  }

  getErrorMessage(formField) {
    return formField.hasError('required') ? 'This field is required' : '';
  }

  onRegisterClick() {
    this.router.navigate(["/sign-up"]);
  }
}
