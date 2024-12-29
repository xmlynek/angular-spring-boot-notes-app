import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import {
  includeBearerTokenInterceptor
} from "keycloak-angular";
import {providePrimeNG} from "primeng/config";
import Material from '@primeng/themes/material';
import {provideKeycloakAngular} from "./keycloak/init-keycloak";


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideKeycloakAngular(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({onSameUrlNavigation: 'reload'})
    ),
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

