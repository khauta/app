import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '@shared';
import { MatCardModule } from '@angular/material/card';
import { SettingsService } from '@core/services/settings.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '@core/services/login.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        MatCheckboxModule,
        RouterLink,
        TranslateModule,
    ]
})
export class LoginComponent {
  isSubmitting = false;
  error = '';
  hide = true;
  options: any;
  themeStyle = '';

  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    rememberMe: FormControl<boolean>;
  }>;

  // just added this due to the below twist of update to the login routine
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: LoginService,
    private tokenService: TokenService,
    private store: LocalStorageService,
    private settings: SettingsService
  ) {
    this.options = this.settings.getOptions();
    this.themeStyle = this.options.theme;
    this.loginForm = this.fb.nonNullable.group({
      username: ['admin', [Validators.required]],
      password: ['admin', [Validators.required]],
      rememberMe: [false],
    });
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }
  // Refactored out due to experimentation of the existing newly created update (applied just below this very routine)
  /*
  login() {
    this.isSubmitting = true;
    this.auth.login(
      this.username.value,
      this.password.value,
      this.rememberMe.value
    );
  }
  */

  // ea itlohela - i might need to adjust my update code to this style to support overall earlier anticipated/tested/expected behavior!

  //Refactor : update code below
  login() {
    this.errorMessage = null;
    this.auth.login(this.loginForm.value.username?? '', this.loginForm.value.password?? '') // ha ke tla beha `?? ''` in front of this fxn args - hee e ne nduba nthoena!
      .subscribe({
        next: () => {
          // Handle successful login (e.g., redirect to a protected page)
          console.log('Login successful!');
        },
        error: (error) => {
          this.errorMessage = error; // Display error message
        }
      });
  }
  // end of life cycle
}
