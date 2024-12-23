import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router : Router) {}

  shouldShowToolbar(): boolean {
    const currentUrl = this.router.url.split('?')[0];
    const excludedRoutes = [
      '/Login',
      '/register',
      '/recuperacion',
    ];
    if (excludedRoutes.includes(currentUrl)) {
      return false;
    }
    if (currentUrl.startsWith('/confirm-forgot/')) {
      return false;
    }
    return true;
  }
  
}
