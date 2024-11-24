import {Component, signal, Signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Note} from "./components/notes/note/note.model";
import {NoteListComponent} from "./components/notes/note-list/note-list.component";
import {NavbarComponent} from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-app';

}
