import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private appService: AppService, 
    private notifications: NotificationsService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      "firstName": new FormControl(this.appService.getUser().firstName, Validators.required),
      "lastName": new FormControl(this.appService.getUser().lastName, Validators.required),
      "username": new FormControl(this.appService.getUser().username, Validators.required),
    });
  }

  onUpdateClick() {
    if(this.formGroup.valid) {
      let putData = {
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        username: this.formGroup.value.username,
      };
      this.apiService.updateUser({user: putData}).subscribe(res => {
        this.notifications.success("Success", "Your profile has updated!");
      })
    } else {
      this.notifications.warn("Warning", "Please fill required fields!");
    }
  }

}
