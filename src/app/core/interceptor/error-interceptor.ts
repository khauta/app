import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '@core/services/token.service';
//import { environment } from '../../../environments/environment';

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  OK = 200,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private toast = inject(ToastrService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, request))
    );
  }

  private handleError(error: HttpErrorResponse, request: HttpRequest<unknown>) {
    const isApiRequest = request.url.startsWith('/api/finance') || request.url.startsWith('/api');
    const message = this.getMessage(error);

    if (isApiRequest) {
      // For API requests, show toast and handle 401 without redirecting to error pages
      this.toast.error(message);
      if (error.status === STATUS.UNAUTHORIZED) {
        this.tokenService.clear();
        this.router.navigateByUrl('/auth/login');
      }
    } else if (this.errorPages.includes(error.status)) {
      // For non-API requests (e.g., UI routes), navigate to error pages
      this.router.navigateByUrl(`/${error.status}`, {
        skipLocationChange: true,
      });
    } else {
      // For other errors, show toast
      this.toast.error(message);
    }

    console.error('HTTP Error:', error);
    return throwError(() => error);
  }

  private getMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.error?.msg) {
      return error.error.msg;
    }
    return `${error.status} ${error.statusText}`;
  }
}