import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@core';
import { BehaviorSubject, fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
private inactivityTimeout = 60 * 1000; // 15 minutes in milliseconds
  private lastActivity: number = Date.now();
  private timeoutId: any;
  private destroy$ = new Subject<void>();
  private isLoggedIn = new BehaviorSubject<boolean>(true);

  constructor(private tokenService: TokenService, private router: Router) {
    this.setupActivityListeners();
  }

  // Start monitoring user activity
  private setupActivityListeners(): void {
    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    );

    activityEvents
      .pipe(
        debounceTime(100), // Debounce to avoid excessive updates
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resetTimer();
      });

    this.startTimer();
  }

  // Reset the timer on user activity
  private resetTimer(): void {
    this.lastActivity = Date.now();
    this.clearTimer();
    this.startTimer();
  }

  // Start the inactivity timer
  private startTimer(): void {
    this.timeoutId = setTimeout(() => {
      this.checkInactivity();
    }, this.inactivityTimeout);
  }

  // Clear the existing timer
  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  // Check if the user has been inactive for too long
  private checkInactivity(): void {
    const timeSinceLastActivity = Date.now() - this.lastActivity;
    if (timeSinceLastActivity >= this.inactivityTimeout && this.isLoggedIn.getValue()) {
      this.logout();
    }
  }

  // Log the user out
  private logout(): void {
    this.tokenService.clear(); // Clear the token
    this.isLoggedIn.next(false);
    this.router.navigateByUrl('/auth/login'); // Redirect to login
  }

  // Public method to start monitoring (if needed)
  public startMonitoring(): void {
    this.isLoggedIn.next(true);
    this.resetTimer();
  }

  // Clean up on service destruction
  public stopMonitoring(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimer();
  }
}