import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Preferences } from '@capacitor/preferences';

@Injectable()
export class WalkthroughGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'visitedWalkthrough' });

    if (value === 'true') {
     
      this.router.navigate(['auth']);
      return false;
    } else {
      return true;
    }
  }
}
