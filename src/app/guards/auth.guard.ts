import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';



export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLogged = authService.isLoggedIn();
  console.log('user autenticado', isLogged);

  if (isLogged) {
    return true; 
  }
  return router.navigate(['/login']).then(() => false); // Redirect to login if not authenticated
};
