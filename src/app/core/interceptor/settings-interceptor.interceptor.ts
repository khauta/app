import { HttpInterceptorFn } from '@angular/common/http';

export const settingsInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
