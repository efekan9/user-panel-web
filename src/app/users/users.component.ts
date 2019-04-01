import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'username'];
  dataSource = null;
  totalCount = 0;
  formGroup: FormGroup;

  constructor(private apiService: ApiService, private notifications: NotificationsService) { }

  ngOnInit() {
    this.fetchUserList();
    this.formGroup = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
    })
  }

  fetchUserList() {
    this.apiService.getUsers().subscribe(res => {
      this.dataSource = res.rows;
      this.totalCount = res.count;
    });
  }
  onSaveClick() {
    if (this.formGroup.valid) {

      let postData = {
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        username: this.formGroup.value.username,
        password: this.formGroup.value.password
      }
      this.apiService.saveUser({ user: postData }).subscribe(res => {
        this.notifications.success("Success", "Save operation is successful!");
        this.fetchUserList();
      }, error => {
        this.dataSource = [];
        this.notifications.error("Error", "Save operation failed!");
      });
    } else {
      this.notifications.warn("Warning", "Please fill required fields!");
    }
  }

  getErrorMessage(formField) {
    return this.formGroup.controls[formField].hasError('required') ? 'This field is required' : '';
  }

}
