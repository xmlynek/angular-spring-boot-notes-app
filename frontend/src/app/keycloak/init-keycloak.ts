import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  provideKeycloak
} from "keycloak-angular";
import {environment} from "../../environments/environment";

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i // Match URLs starting with http://localhost:8181
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.keycloakUrl,
      realm: environment.keycloakRealm,
      clientId: environment.keycloakClientId
    },
    initOptions: {
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
      enableLogging: true,
    },
    providers: [
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
      }
    ]
  });
