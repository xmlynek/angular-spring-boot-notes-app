import {
  ApplicationConfig, inject, provideAppInitializer,
  provideExperimentalZonelessChangeDetection, Provider
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./keycloak/init-keycloak";
import {providePrimeNG} from "primeng/config";
import Material from '@primeng/themes/lara';

const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding()),
    KeycloakService,
    provideAppInitializer(() => initializeKeycloak(inject(KeycloakService))()),
    KeycloakBearerInterceptorProvider,
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dark'
        }
      },
      ripple: true
    })
  ]
};

