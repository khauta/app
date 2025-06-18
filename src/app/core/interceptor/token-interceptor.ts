import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '@core';
import { Router } from '@angular/router';
//import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Inside the interceptor');
    const isApiRequest = request.url.startsWith('http://18.191.177.213/api/') || request.url.startsWith('finance');
    if (!isApiRequest) {
      return next.handle(request);
    }

    let authReq = request;
    const token = this.tokenService.getBearerToken();
    if (token && this.tokenService.valid()) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: false,
      });
    }

    return next.handle(authReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && request.url.includes('/auth/logout') && event.status === 200) {
          this.tokenService.clear();
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}