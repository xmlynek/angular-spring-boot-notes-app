import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {authGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About'
  },
  {
    path: 'notes',
    canActivate: [authGuard],
    title: 'Notes',
    loadChildren: () => import('./components/notes/notes.routes').then(m => m.notesRoutes)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
