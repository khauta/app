import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branding',
  template: `
    <div
      class="d-inline-block text-nowrap r-full text-reset m-l-12 m-r-12"
      (click)="goToHome()"
    >
      <img
        src="./assets/images/logo.png"
        class="brand-logo align-middle m-2"
        alt="logo"
      />
      <span class="brand-name"></span>
    </div>
  `,
  styles: [
    `
      .brand-logo {
        width: 120px;
        height: 32px;
        cursor: pointer;
      }
      .brand-name {
        vertical-align: middle;
        font-weight: 680;
        font-size: 16px;
        color: #5148a0;
        margin: 0px 8px;
        cursor: pointer;
      }
    `,
  ],
  standalone: true,
})
export class BrandingComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['./dashboard/dashboard1']);
  }
}
