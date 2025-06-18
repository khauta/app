import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Menu, STATUS, TokenService } from '@core';
import { catchError, map } from 'rxjs/operators';
import { User } from '@core/models/interface';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JWT } from './JWT';
import { LocalStorageService } from '@shared';
const jwt = new JWT();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private users: User[] = [];
  user$ = new BehaviorSubject<User>({});

  // the base url for auth API end point declaration here below:
  private apiUrl = 'http://18.191.177.213/api/login';  /* previous test 1 offline or local auth uri:\* 'http://localhost/wordpress/wp-json/jwt-auth/v1/token'; /* */

  constructor(protected http: HttpClient, private store: LocalStorageService, private router: Router, private tokenService: TokenService) {
    this.loadUsers();
  }
  private loadUsers() {
    this.http.get<User[]>('assets/data/users.json?_t=' + Date.now()).subscribe(
      (response: User[]) => {
        // Assign the response to the users property
        this.users = response;
        // console.log('Users:', this.users);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  // decided to comment all this because i've been experincing issues this morning with transitioning from logi UI to dashboard as expected - 24-10-24 @ 11:38
  /*
  login(email: string, password: string, rememberMe = false) {
    
    // return a post call to the baseUrl's auth end point

    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap((response: any) => {
        this.tokenService.set(response.token.access_token); // Store the JWT securely
        const returnValue = JSON.parse(JSON.stringify(response))['token'];
        this.tokenService.set(returnValue);
        this.user$.next(JSON.parse(JSON.stringify(response))['user']);
        this.store.set('currentUser', response.user);
        // Store role names in a new array
        console.log('i am suppossed to redirect');
        this.router.navigate(['dashboard/dashboard']);
      }),
      catchError((error) => {
        // Handle login error (e.g., invalid credentials)
        return throwError(() => 'Invalid username or password');
      })
    );
  }
  */
 login(email: string, password: string, rememberMe = false){
  return this.http.post(this.apiUrl, { email, password }).pipe(
    tap((response: any) => {
      // Store only the access token
      console.log(response);
      const accessToken = response.auth; 
      this.tokenService.set(accessToken); 

      
      //console.log('AUTH.USER: ' + response.auth.user);
      //console.log('JUSER :' + response.user.user);
      this.user$.next(response.user);
      this.store.set('currentUser', response.user); 
    }),
    catchError((error: HttpErrorResponse) => {
      // Handle login error and prevent redirection
      console.error('Login error:', error); 
      return throwError(() => error); // Re-throw the error for proper handling
    }),
    tap(() => {
      // Redirect after successful login and token storage
      this.router.navigate(['dashboard/dashboard']); 
    })
  );
 }

  refresh() {
    const user = Object.assign({}, this.store.get('currentUser'));

    const result = user
      ? { status: STATUS.OK, body: jwt.generate(user) }
      : { status: STATUS.UNAUTHORIZED, body: {} };

    return of(result);
  }

  logout() {
    this.store.clear();
    return of({ success: false });
  }

  user() {
    console.log(this.http.get<User>('/user'));
    return this.http.get<User>('/user');
  }
  menu(): Observable<Menu[]> {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(
        map((response: { menu: Menu[] }) => response.menu),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
