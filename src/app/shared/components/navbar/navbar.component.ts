import {Component, OnInit, signal} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {ButtonDirective} from "primeng/button";
import {MenuItem, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = signal(false);
  constructor(private primengConfig: PrimeNGConfig) {}

  toggleMenu() {
    this.isMenuOpen.update((prev) => !prev);
  }

  menuItems = signal<Array<MenuItem>>([]);

  ngOnInit() {
    this.primengConfig.ripple = true; // Enable PrimeNG ripple effect
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
      {
        label: 'Profile',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: ['/settings'],
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ]);
  }

    logout() {
      console.log('User logged out'); // Implement logout logic here
    }
}
