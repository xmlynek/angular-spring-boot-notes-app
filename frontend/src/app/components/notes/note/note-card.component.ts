import {ChangeDetectionStrategy, Component, inject, model, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ButtonDirective} from "primeng/button";
import {DeleteButtonComponent} from "../../../shared/delete-button/delete-button.component";
import {Note} from "../../../core/modules/openapi";
import {NotesStore} from "../../../store/notes.store";

@Component({
  selector: 'app-note-card',
  imports: [
    DatePipe,
    CardModule,
    TagModule,
    ButtonDirective,
    DeleteButtonComponent,
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteCardComponent {

  private readonly notesStore = inject(NotesStore);
  note = model.required<Note>();
  edit = output<Note>();

  togglePinned = (event: MouseEvent) => {
    event.stopPropagation();
    this.notesStore.updateNote(this.note().id, {...this.note(), isPinned: !this.note().isPinned});
  }

  handleEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.note());
  }

  handleDelete() {
    this.notesStore.deleteNote(this.note().id);
  }
}
