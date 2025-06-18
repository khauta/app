import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'; // Removed RouterLink as it's not used directly in TS usually
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '@core';
import { LocalStorageService } from '@shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; // Import takeUntil

// Function to validate that two fields match (keep as is)
export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (!control || !matchingControl) return null;
      if (matchingControl.errors && !matchingControl.errors['mismatch']) return null;
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
         const errors = matchingControl.errors;
         if (errors) {
           delete errors['mismatch'];
           if (Object.keys(errors).length === 0) matchingControl.setErrors(null);
           else matchingControl.setErrors(errors);
         }
        return null;
      }
    };
}

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MatCardModule, // Removed as using dialog structure
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './password-update.component.html',
  // No specific SCSS needed unless further customization is required
})
export class PasswordUpdateComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  private readonly UPDATE_PASSWORD_URL = 'http://18.191.177.213/api/update-password';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PasswordUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private storageService: LocalStorageService, // Renamed for clarity
    private snackBar: MatSnackBar
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: matchValidator('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const newPasswordValue = this.newPassword?.value;

    // --- Retrieve User ID ---
    let userId: number | null = null;
    // *** FIX: Directly use the object returned by the service ***
    const currentUser = this.storageService.get('currentUser'); // Get the object/value

    // Check if currentUser exists and has an 'id' property
    if (currentUser && typeof currentUser === 'object' && 'id' in currentUser) {
        userId = currentUser.id;
    } else {
        console.error("User data not found in storage or is invalid:", currentUser);
        this.errorMessage = "Could not retrieve user information. Please log in again.";
        this.isSubmitting = false;
        return;
    }
    // --- End Retrieve User ID ---

    const token = this.tokenService.getBearerToken();

    if (!token) {
        this.errorMessage = "Authentication token not found. Please log in again.";
        this.isSubmitting = false;
        return;
    }

    // --- Prepare API Request ---
    const requestBody = {
      user_id: userId,
      password: newPasswordValue
      // SECURITY WARNING: Current password is NOT being sent for validation here!
    };

    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    // --- End Prepare API Request ---

    console.log('Submitting password update API call...');

    // --- Perform API Call ---
    this.httpClient.post(this.UPDATE_PASSWORD_URL, requestBody, { headers })
      .pipe(takeUntil(this.destroy$)) // Unsubscribe on component destroy
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          console.log('Password update API success:', response);
          this.snackBar.open('Password updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close('success');
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          console.error('Password Update API Error:', error);
          this.errorMessage = error.error?.message || error.message || 'Password update failed.';
        }
      });
      // --- End Perform API Call ---
  }

  onCancel(): void {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
    // Optional: Add logout logic here if needed
    this.tokenService.clear();
  }
}
// import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core'; // Inject added
// import {
//   FormBuilder,
//   Validators,
//   ReactiveFormsModule,
//   FormGroup,
//   AbstractControl,
//   ValidationErrors,
//   ValidatorFn,
// } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { TranslateModule } from '@ngx-translate/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogRef and MAT_DIALOG_DATA
// // Import your service for updating the password
// // import { AuthService } from '@core/services/auth.service'; // Example

// // Match validator function (assuming it's defined here or imported)
// export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
//     // (validator implementation as provided previously)
//     return (formGroup: AbstractControl): ValidationErrors | null => {
//       const control = formGroup.get(controlName);
//       const matchingControl = formGroup.get(matchingControlName);
//       if (!control || !matchingControl) return null;
//       if (matchingControl.errors && !matchingControl.errors['mismatch']) return null;
//       if (control.value !== matchingControl.value) {
//         matchingControl.setErrors({ mismatch: true });
//         return { mismatch: true };
//       } else {
//          const errors = matchingControl.errors;
//          if (errors) {
//            delete errors['mismatch'];
//            if (Object.keys(errors).length === 0) matchingControl.setErrors(null);
//            else matchingControl.setErrors(errors);
//          }
//         return null;
//       }
//     };
// }

// @Component({
//   selector: 'app-password-update',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     RouterLink,
//     TranslateModule,
//   ],
//   templateUrl: './password-update.component.html',
//   styleUrls: ['./password-update.component.scss', '../login/login.component.scss'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class PasswordUpdateComponent implements OnInit {
//   updatePasswordForm: FormGroup;
//   hideOld = true;
//   hideNew = true;
//   hideConfirm = true;
//   isSubmitting = false;
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     // private router: Router, // Router might not be needed if LoginComponent handles navigation
//     // private authService: AuthService, // Inject your actual password update service
//     public dialogRef: MatDialogRef<PasswordUpdateComponent>, // Inject MatDialogRef
//     @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA if you pass any data
//   ) {
//     this.updatePasswordForm = this.fb.group({
//       currentPassword: ['', [Validators.required]],
//       newPassword: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]]
//     }, {
//       validators: matchValidator('newPassword', 'confirmPassword')
//     });
//   }

//   ngOnInit(): void {}

//   get currentPassword() { return this.updatePasswordForm.get('currentPassword'); }
//   get newPassword() { return this.updatePasswordForm.get('newPassword'); }
//   get confirmPassword() { return this.updatePasswordForm.get('confirmPassword'); }

//   submit(): void {
//     if (this.updatePasswordForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     this.errorMessage = null;

//     const currentPassword = this.currentPassword?.value;
//     const newPassword = this.newPassword?.value;

//     console.log('Submitting password update from modal...');

//     // --- Placeholder for actual API call ---
//     // Use your injected service to update the password
//     // Example:
//     // this.authService.updatePassword(currentPassword, newPassword).subscribe({
//     //   next: () => {
//     //     this.isSubmitting = false;
//     //     console.log('Password updated successfully via API.');
//     //     this.dialogRef.close('success'); // Close the dialog and signal success
//     //   },
//     //   error: (error) => {
//     //     this.isSubmitting = false;
//     //     this.errorMessage = error.message || 'Password update failed. Please try again.';
//     //     console.error('Password Update Error:', error);
//     //     // Keep the dialog open on error
//     //   }
//     // });

//     // Simulate API call delay & success for now
//     setTimeout(() => {
//        this.isSubmitting = false;
//        console.log('Password update successful (simulated). Closing modal.');
//        this.dialogRef.close('success'); // Close dialog and return 'success'
//        // Simulate error:
//        // this.errorMessage = 'Invalid current password (simulated)';
//        // this.isSubmitting = false; // Ensure button is re-enabled on error
//      }, 1500);
//     // --- End Placeholder ---
//   }

//   // Optional: Add a cancel button/logic if needed
//   // onCancel(): void {
//   //   this.dialogRef.close(); // Close without success signal
//   // }
// }