import {Component, signal, Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Note} from "./components/notes/notes.model";
import {NoteListComponent} from "./components/notes/note-list/note-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService]
})
export class AppComponent {
  title = 'notes-app';

}
