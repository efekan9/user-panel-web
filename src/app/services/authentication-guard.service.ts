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
  CanActivateChild,
  Router
} from '@angular/router';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    public appService: AppService,
    private apiService: ApiService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.appService.getToken()) {
      if (!this.appService.getUser()) {
        return this.apiService.getProfile().pipe(
          map(response => {
            this.appService.setUser(
              response,
            );
            return true;
          }),
          catchError(error => {
            this.appService.logout();
            return of(false);

          })
        );
      } else {
        return of(true);
      }
    }
    this.router.navigate(["/sign-in"]);
    return of(false);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state)
  }
}