import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authenticacion.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/Login']); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        }
      })
    );
  }
}
