import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //return true;
  if (authService.UserInfo.IsLogIn) {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/login');
};
