import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Menu, MenuService } from './menu.service';
import { AuthService } from './auth.service';
import { User } from '@core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   */
  load() {
    return this.authService
      .change()
      .pipe(
        switchMap(() => {
          return this.authService.menu();
        }),
        tap((menu) => {
          this.setMenu(menu);
        })
      )
      .subscribe();
  }

  private setMenu(menu: Menu[]) {
    // this is not necessary for now, i just know that i edit this out once i done my changes in the assets data menu file, i note that from the definition file that has this method, i can creat as i wish menu-es or menu items i want then use or apply them as here!

    /* *this.menuService.addNamespace(menu, 'menu');/* */     
    this.menuService.set(menu);
  }
}
