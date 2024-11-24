import {Component, input} from '@angular/core';
import {Note} from "./note.model";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-note',
    imports: [
        DatePipe
    ],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss'
})
export class NoteComponent {

  note = input.required<Note>();

  protected readonly JSON = JSON;
}
