import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private apiService: ApiService, 
    private notifications: NotificationsService,
    private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required)
    });
  }

  onRegisterClick() {
    if (this.signUpForm.valid) {
      const registerData = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      }
      this.apiService.signUp(registerData).subscribe(res => {
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

  onLoginClick() {
    this.router.navigate(["/sign-in"])
  }

  getErrorMessage(formField) {
    return this.signUpForm.controls[formField].hasError('required') ? 'This field is required' : '';
  }

}
