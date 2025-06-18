import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, iif, merge, of } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { User } from '@core/models/interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>({});

  private change$!: Observable<User>;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private store: LocalStorageService
  ) {
    this.user$ = new BehaviorSubject<User>(this.store.get('currentUser'));
    this.change$ = merge(
      this.tokenService.change(),
      this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
    ).pipe(
      switchMap(() => {
        return this.assignUser(this.user$);
      }),
      share()
    );
  }

  init() {
    return new Promise<void>((resolve) =>
      this.change$.subscribe(() => resolve())
    );
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }
  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).subscribe({
      next: (response) => {
        const returnValue = JSON.parse(JSON.stringify(response))['token'];
        this.tokenService.set(returnValue);
        this.user$.next(JSON.parse(JSON.stringify(response))['user']);
        this.store.set('currentUser', response.user);
        // Store role names in a new array

        this.router.navigate(['dashboard/dashboard']);
      },
      error: (error) => {
        // Handle errors here
        console.error(error);
      },
    });
  }
  refresh() {
    return this.loginService.refresh();
  }

  logout() {
    return this.loginService.logout().subscribe((res) => {
      if (!res.success) {
        this.tokenService.clear();
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  assignUser(user: BehaviorSubject<User>): Observable<User> {
    this.user$.next(user.getValue()); // Update the user$ BehaviorSubject with the new value
    return this.user$.asObservable(); // Return an observable that emits the new user value
  }
}
