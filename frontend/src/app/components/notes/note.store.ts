import {DestroyRef, inject, Injectable} from '@angular/core';
import {Note, NoteRequest, NotesService} from "../../core/modules/openapi";
import {rxResource} from "@angular/core/rxjs-interop";
import {NoteFormModel} from "./note-form/note-form.model";

@Injectable({providedIn: 'root'})
export class NoteStore {

  private destroyRef = inject(DestroyRef);
  private noteService = inject(NotesService);

  private notesResourceRef = rxResource<Note[], void>({
    loader: () => this.noteService.getNotes(),
  });


  get notes() {
    return this.notesResourceRef.value.asReadonly();
  }

  get loading() {
    return this.notesResourceRef.isLoading();
  }

  get error() {
    return this.notesResourceRef.error();
  }

  createNote(note: NoteFormModel) {
    const subscription = this.noteService.createNote({...note, isPinned: false}).subscribe({
      next: () => this.reloadNotes(),
      error: err => console.error('Failed to create note:', err)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateNote(noteId: string, note: NoteRequest) {
    const subscription = this.noteService.updateNote(noteId, note).subscribe({
      next: () => this.reloadNotes(),
      error: err => console.error('Failed to update note:', err)
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }


  deleteNote(noteId: string) {
    const subscription = this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        this.reloadNotes();
      },
      error: err => console.error('Failed to delete note:', err)
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  reloadNotes() {
    this.notesResourceRef.reload();
  }
}
