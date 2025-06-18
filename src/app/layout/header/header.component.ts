import {
  Component,
  Output,
  EventEmitter,
  Input,
  Inject,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import screenfull from 'screenfull';
import { UserComponent } from '../widgets/user.component';
import { NotificationComponent } from '../widgets/notification/notification.component';
import { TranslateComponent } from '../widgets/translate.component';
import { BrandingComponent } from '../widgets/branding.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FeatherModule } from 'angular-feather';
// new changes on header component @date 2021-09-29
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandingComponent,
    TranslateComponent,
    NotificationComponent,
    UserComponent,
    FeatherModule
  ],
})
export class HeaderComponent {

  constructor(@Inject(AdminLayoutComponent) private adminLayout: AdminLayoutComponent) {}

  @HostBinding('class') class = 'header';

  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
  toggleSideNavSetIn(toggleSideNavGet: string) {
    this.adminLayout.toggleSideNavSetIn(toggleSideNavGet);
  }
}
