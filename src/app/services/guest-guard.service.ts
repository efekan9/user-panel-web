import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';


@Injectable()
export class GuestGuardService implements CanActivate {
  constructor(private appService: AppService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("efe ser", this.appService.getToken())
    if (this.appService.getToken()) {
      this.router.navigate(['/panel']);
      return false;
    } else {
      return true;
    }
  }
}