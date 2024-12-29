import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import Keycloak from "keycloak-js";

describe('AppComponent', () => {
  let mockKeycloak: jasmine.SpyObj<Keycloak>;

  beforeEach(async () => {
    mockKeycloak = jasmine.createSpyObj('Keycloak', [
      'authenticated',
      'login',
      'logout',
      'accountManagement'
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: Keycloak, useValue: mockKeycloak
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
