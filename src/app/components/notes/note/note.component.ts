import {Component, inject, input, model} from '@angular/core';
import {Note} from "../notes.model";
import {DatePipe, NgClass} from "@angular/common";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ButtonDirective} from "primeng/button";
import {PrimeIcons} from "primeng/api";
import {NotesService} from "../notes.service";
import {ToolbarComponent} from "../../../shared/toolbar/toolbar.component";

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

  private notesService = inject(NotesService);
  note = model.required<Note>();

  togglePinned = (event: MouseEvent) => {
    event.stopPropagation();
    this.notesService.updateNote({...this.note(), isPinned: !this.note().isPinned});
  }

  handleEdit(event: MouseEvent) {
    event.stopPropagation();

  }
}
