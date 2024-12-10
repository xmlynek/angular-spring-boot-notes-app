import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";
import {ApiModule, NotesService, Note} from "../../core/modules/openapi";
import {rxResource} from "@angular/core/rxjs-interop";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-notes',
  imports: [
    NoteListComponent,
    NoteFormComponent,
    ModalComponent,
    ButtonDirective,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ApiModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  showDialog = signal<boolean>(false); // For showing the create/edit dialog
  private destroyRef = inject(DestroyRef);

  private notesService = inject(NotesService);
  notes = signal<Note[]>([]);

  notesRsc = rxResource({
    loader: () => this.notesService.getNotes(),
  })

  constructor() {
    const sub = this.notesService.getNotes().subscribe((notes) => this.notes.set(notes));
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  createNewNote() {
    this.showDialog.set(true); // Show dialog
  }

  saveNote(noteRequest: NoteFormModel) {
    const sub = this.notesService.createNote({
      ...noteRequest,
      isPinned: false,
    }).pipe(
      tap(() => this.showDialog.set(false)),
      switchMap(() => this.notesService.getNotes()))
    .subscribe({
      next: (notes) => this.notes.set(notes),
      error: (error) => console.error('Error creating note:', error)
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }


}
