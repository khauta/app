import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@shared';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';
import { currentTimestamp, filterObject } from './helpers';
import { Token } from '@core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnDestroy {
  // SAMS auth end point barrieer token
  private key = 'auth_token'; // Choose a suitable key name

  /* older versions(R): private key = 'redstar-token'; */

  private change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private refresh$ = new Subject<BaseToken | undefined>();
  private timer$?: Subscription;

  private _token?: BaseToken;

  private _roleArray: [] = [];

  private _permissionArray: string[] = [];

  constructor(
    private store: LocalStorageService,
    private factory: TokenFactory
  ) { }

  /* Update Code - for refactoring purposes */


  // excused 2 mins (R) - compliance to existing code[purpose]
  /*set(token: string): void {
    // Implement secure token storage (sessionStorage or HttpOnly cookies)
    // Example for sessionStorage:
    sessionStorage.setItem(this.key, token);
  }*/

 
  // this get method is left as is because it was not previously implemented in the code found in here

  get(): string | null {
    // Implement token retrieval from secure storage
    // Example for sessionStorage:
    return sessionStorage.getItem(this.key);
  }

  // ena e ka holimo ako e tlohele hobane ea itlohela - might need change it to match the similar perfoming function in the code underneath although named differently



  // excused 2 mins (R) - compliance to existing code[purpose]
  /*clear(): void {
    // Implement token removal from secure storage
    // Example for sessionStorage:
    sessionStorage.removeItem(this.key);
  }*/


  /* my refactor aid code end */

  private get token(): BaseToken | undefined {
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }

    return this._token;
  }

  change(): Observable<BaseToken | undefined> {
    return this.change$.pipe(share());
  }

  refresh(): Observable<BaseToken | undefined> {
    this.buildRefresh();

    return this.refresh$.pipe(share());
  }

  // refactored as per the above update but kept two versions of it because they were not fighting (conflict) - we'll see in action [in the browser hore na ha li loane na?]
  set(token?: Token): TokenService {
    // Implement secure token storage (sessionStorage or HttpOnly cookies)
    // Example for sessionStorage:
    sessionStorage.setItem(this.key, token?.access_token || 'sthg wrong here');
    this.save(token);

    return this;
  }

  // same same here - As:
  // refactored as per the above update but kept two versions of it because they were not fighting (conflict) - we'll see in action [in the browser hore na ha li loane na?]
  clear(): void {
    // Implement token removal from secure storage
    // Example for sessionStorage:
    sessionStorage.removeItem(this.key);
    this.save();
  }

  valid(): boolean {
    return this.token?.valid() ?? false;
  }

  getBearerToken(): string {
    return this.token?.getBearerToken() ?? '';
  }

  getRefreshToken(): string | void {
    return this.token?.refresh_token;
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }

  private save(token?: Token): void {
    this._token = undefined;
    if (!token) {
      this.store.remove(this.key);
    } else {
      const value = Object.assign(
        { access_token: '', token_type: 'Bearer' },
        token,
        {
          exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
        }
      );
      this.store.set(this.key, filterObject(value));
    }
    this.change$.next(this.token);
    this.buildRefresh();
  }

  private buildRefresh() {
    this.clearRefresh();

    if (this.token?.needRefresh()) {
      this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
        this.refresh$.next(this.token);
      });
    }
  }

  private clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }


  public get roleArray(): [] {
    return this._roleArray;
  }
  public set roleArray(value: []) {
    this._roleArray = value;
  }

  public get permissionArray(): string[] {
    return this._permissionArray;
  }
  public set permissionArray(value: string[]) {
    this._permissionArray = value;
  }
}
