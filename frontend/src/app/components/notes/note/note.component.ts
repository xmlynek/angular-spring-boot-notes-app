import {Component, inject, model} from '@angular/core';
import {Note} from "../notes.model";
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ButtonDirective} from "primeng/button";
import {NotesService} from "../notes.service";
import {DeleteButtonComponent} from "../../../shared/delete-button/delete-button.component";

@Component({
  selector: 'app-note',
  imports: [
    DatePipe,
    CardModule,
    TagModule,
    ButtonDirective,
    DeleteButtonComponent,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  private notesService = inject(NotesService);
  note = model.required<Note>();

  togglePinned = (event: MouseEvent) => {
    event.stopPropagation();
    this.notesService.toggleNotePinned(this.note().id, !this.note().isPinned);
  }

  handleEdit(event: MouseEvent) {
    event.stopPropagation();

  }

  handleDelete() {
    this.notesService.deleteNote(this.note().id);
  }
}
