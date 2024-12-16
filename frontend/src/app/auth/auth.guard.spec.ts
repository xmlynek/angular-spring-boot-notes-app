import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

import { authGuard } from './auth.guard';
import {KeycloakService} from "keycloak-angular";
import {provideExperimentalZonelessChangeDetection} from "@angular/core";

describe('authGuard', () => {
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockKeycloakService = jasmine.createSpyObj<KeycloakService>(['isLoggedIn', 'login']);
    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: mockKeycloakService },
        provideExperimentalZonelessChangeDetection()
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    mockKeycloakService.isLoggedIn.and.returnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/notes' } as RouterStateSnapshot;
    const result = executeGuard(route, state);

    expect(result).toBeTrue();
    expect(mockKeycloakService.isLoggedIn).toHaveBeenCalled();
    expect(mockKeycloakService.login).not.toHaveBeenCalled();
  });

  it('should call login and return false if user is not logged in', () => {
    mockKeycloakService.isLoggedIn.and.returnValue(false);

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/notes' } as RouterStateSnapshot;
    const result = executeGuard(route, state);

    expect(result).toBeFalse();
    expect(mockKeycloakService.isLoggedIn).toHaveBeenCalled();
    expect(mockKeycloakService.login).toHaveBeenCalledWith({ redirectUri: window.location.origin + state.url });
  });

});
