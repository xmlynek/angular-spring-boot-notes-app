import { TestBed } from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

import { authGuard } from './auth.guard';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import Keycloak from "keycloak-js";

describe('authGuard', () => {
  let mockKeycloak: jasmine.SpyObj<Keycloak>;
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockKeycloak = jasmine.createSpyObj('Keycloak', [
      'authenticated',
      'login',
      'logout',
      'accountManagement',
      'init'
    ], {
      authenticated: true,
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: Keycloak, useValue: mockKeycloak },
        provideExperimentalZonelessChangeDetection()
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    mockKeycloak.init.and.returnValue(Promise.resolve(true));

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/notes' } as RouterStateSnapshot;
    const result = executeGuard(route, state);

    expect(result).toBeTrue();
    expect(mockKeycloak.login).not.toHaveBeenCalled();
  });

  it('should call login and return false if user is not logged in', () => {
    mockKeycloak = jasmine.createSpyObj('Keycloak', [
      'authenticated',
      'login',
      'logout',
      'accountManagement',
      'init'
    ], {
      authenticated: false,
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: Keycloak, useValue: mockKeycloak },
        provideExperimentalZonelessChangeDetection()
      ]
    });

    const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    mockKeycloak.authenticated = false;
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/notes' } as RouterStateSnapshot;
    const result = executeGuard(route, state);

    expect(result).toBeFalse();
    expect(mockKeycloak.login).toHaveBeenCalledWith({ redirectUri: window.location.origin + state.url });
  });

});
