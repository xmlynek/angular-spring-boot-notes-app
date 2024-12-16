import {Component, inject, OnInit, signal} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {ButtonDirective} from "primeng/button";
import {MenuItem} from "primeng/api";
import {RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {MenuModule} from "primeng/menu";

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
  private keycloakService = inject(KeycloakService);

  menuItems = signal<Array<MenuItem>>([]);
  isLoggedIn = signal<boolean>(this.keycloakService.isLoggedIn());

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
      this.keycloakService.login();
    }

    handleManageAccount() {
      this.keycloakService.getKeycloakInstance().accountManagement();
    }

    handleLogout() {
      this.keycloakService.logout(window.location.origin + "/home");
    }
}
