import {Component, input} from '@angular/core';
import {NoteComponent} from "../note/note.component";
import {Note} from "../note/note.model";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    NoteComponent
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {

  notes = input.required<Array<Note>>();

}
