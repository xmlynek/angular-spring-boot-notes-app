import {Component, DestroyRef, inject, model} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {ButtonDirective} from "primeng/button";
import {DeleteButtonComponent} from "../../../shared/delete-button/delete-button.component";
import {Note, NotesService} from "../../../core/modules/openapi";

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
  private destroyRef = inject(DestroyRef);
  note = model.required<Note>();

  togglePinned = (event: MouseEvent) => {
    event.stopPropagation();
    const sub = this.notesService.updateNote(this.note().id!, {
      ...this.note(),
      isPinned: !this.note().isPinned
    }).subscribe({
      next: (updatedNote) => this.note.set(updatedNote)
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  handleEdit(event: MouseEvent) {
    event.stopPropagation();

  }

  handleDelete() {
    const sub = this.notesService.deleteNote(this.note().id!).subscribe();
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
