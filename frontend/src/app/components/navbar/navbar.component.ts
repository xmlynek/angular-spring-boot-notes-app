import {Component, inject, OnInit, signal} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {ButtonDirective} from "primeng/button";
import {MenuItem} from "primeng/api";
import {RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import Keycloak from "keycloak-js";

@Component({
    selector: 'app-navbar',
    imports: [
        MenubarModule,
        ButtonDirective,
        RouterLink,
        MenuModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private keycloak = inject(Keycloak);

  menuItems = signal<Array<MenuItem>>([]);
  isLoggedIn = signal<boolean>(this.keycloak.authenticated || false);

  profileMenuItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.handleManageAccount(),
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.handleLogout(),
    },
  ];

  ngOnInit() {
    this.menuItems.set([
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Notes',
        icon: 'pi pi-book',
        routerLink: ['/notes'],
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        routerLink: ['/about'],
      },
    ]);
  }

    handleLogin() {
      this.keycloak.login({redirectUri: window.location.origin + '/home'});
    }

    handleManageAccount() {
      this.keycloak.accountManagement();
    }

    handleLogout() {
      this.keycloak.logout({redirectUri: window.location.origin + "/home"});
    }
}
