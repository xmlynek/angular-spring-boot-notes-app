import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";

export const authGuard: CanActivateFn = (route, state): boolean => {
  const keycloakService = inject(KeycloakService);

  if (keycloakService.isLoggedIn()) {
    return true;
  }
  keycloakService.login({redirectUri: window.location.origin + state.url});
  return false;
};
