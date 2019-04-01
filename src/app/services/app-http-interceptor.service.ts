import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable()
export class AppHttpInterceptorService implements HttpInterceptor {

  constructor(private appService: AppService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("token");
    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(req).pipe(
      tap((event:HttpEvent<any>) => {
        
      }, error => {
          if(error instanceof HttpErrorResponse && error.status == 401) {
            this.appService.logout();
          }
      }),
      catchError((errorRes: HttpErrorResponse) => {
         return observableThrowError(errorRes.error);
      })
    )
  }
}


