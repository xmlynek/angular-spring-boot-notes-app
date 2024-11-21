import {Component, input} from '@angular/core';
import {Note} from "./note.model";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  note = input.required<Note>();

}
