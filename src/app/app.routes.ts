import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {NotesComponent} from "./pages/notes/notes.component";
import {NotePageComponent} from "./pages/note/note.component";
import {ConfirmationService} from "primeng/api";

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
    children: [
      { path: '', component: NotesComponent },
      { path: ':noteId', component: NotePageComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
