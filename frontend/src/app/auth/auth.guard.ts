import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import Keycloak from "keycloak-js";

export const authGuard: CanActivateFn = (route, state): boolean => {
  const keycloak = inject(Keycloak);

  if (keycloak.authenticated) {
    return true;
  }
  keycloak.login({redirectUri: window.location.origin + state.url});
  return false;
};
