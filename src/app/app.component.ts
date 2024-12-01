import {Component, signal, Signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Note} from "./components/notes/notes.model";
import {NoteListComponent} from "./components/notes/note-list/note-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-app';

}
