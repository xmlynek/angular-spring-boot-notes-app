import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {NoteListComponent} from "./components/notes/note-list/note-list.component";
import {NotesComponent} from "./pages/notes/notes.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
