import {Component, input, signal, Signal} from '@angular/core';
import {NoteComponent} from "../note/note.component";
import {Note} from "../note/note.model";

@Component({
    selector: 'app-note-list',
    imports: [
        NoteComponent
    ],
    templateUrl: './note-list.component.html',
    styleUrl: './note-list.component.scss'
})
export class NoteListComponent {

  notes = input.required<Note[]>();

}
