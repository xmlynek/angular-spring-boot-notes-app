import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {NoteStore} from "../notes/note.store";
import {ActivatedRoute, RouterLink} from "@angular/router";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;

  const fakeActivatedRoute = {
    snapshot: {data: {}}
  } as ActivatedRoute;

  beforeEach(async () => {
    mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
      'isLoggedIn',
      'login',
      'logout',
      'getKeycloakInstance'
    ]);
    mockKeycloakService.isLoggedIn.and.returnValue(true);


    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {provide: KeycloakService, useValue: mockKeycloakService},
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
    expect(mockKeycloakService.login).toHaveBeenCalled();
  });

  it('should call accountManagement on Keycloak instance when handleManageAccount is called', () => {
    const mockKeycloakInstance = jasmine.createSpyObj('KeycloakInstance', ['accountManagement']);
    mockKeycloakService.getKeycloakInstance.and.returnValue(mockKeycloakInstance);

    component.handleManageAccount();
    expect(mockKeycloakInstance.accountManagement).toHaveBeenCalled();
  });

  it('should call KeycloakService logout method when logout button is clicked', () => {
    component.handleLogout()

    expect(mockKeycloakService.logout).toHaveBeenCalled();
  });
});
