import {Component, input} from '@angular/core';
import {Note} from "./note.model";
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-note',
  imports: [
    DatePipe,
    CardModule,
    TagModule,
    ButtonDirective,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  note = input.required<Note>();

  protected readonly JSON = JSON;
}
