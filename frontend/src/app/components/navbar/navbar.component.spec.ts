import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Keycloak from "keycloak-js";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockKeycloak: jasmine.SpyObj<Keycloak>;

  const fakeActivatedRoute = {
    snapshot: {data: {}}
  } as ActivatedRoute;

  beforeEach(async () => {
    mockKeycloak = jasmine.createSpyObj('Keycloak', [
      'authenticated',
      'login',
      'logout',
      'accountManagement'
    ]);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {provide: Keycloak, useValue: mockKeycloak},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on KeycloakService when handleLogin is called', () => {
    component.handleLogin();
    expect(mockKeycloak.login).toHaveBeenCalled();
  });

  it('should call accountManagement on Keycloak instance when handleManageAccount is called', () => {
    component.handleManageAccount();
    expect(mockKeycloak.accountManagement).toHaveBeenCalled();
  });

  it('should call KeycloakService logout method when logout button is clicked', () => {
    component.handleLogout()

    expect(mockKeycloak.logout).toHaveBeenCalled();
  });
});
