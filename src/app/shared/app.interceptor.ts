import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authReq = req;
    let pass = false;
    if (this.token.getToken()) {
      pass = true;
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).do(
        (rsp: any) => {
          console.log('rsp', rsp);
          if (!pass) {
            this.router.navigate(['/user']);
          }
          if (rsp instanceof HttpErrorResponse) {
            if (rsp.status === 401) {
              this.router.navigate(['/user']);
            }
          }
        }
      );
  }

}
