import {Component, inject, signal} from '@angular/core';
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";
import {ApiModule, Note} from "../../core/modules/openapi";
import {NoteStore} from "../../components/notes/note.store";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TextareaModule} from "primeng/textarea";

@Component({
  selector: 'app-notes',
  imports: [
    NoteListComponent,
    NoteFormComponent,
    ModalComponent,
    ButtonDirective,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ApiModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  protected noteStore = inject(NoteStore);
  notes = this.noteStore.notes;
  showDialog = signal<boolean>(false);
  selectedNoteToEdit = signal<Note | null>(null);

  constructor() {
    this.noteStore.reloadNotes();
  }

  createNewNote() {
    this.selectedNoteToEdit.set(null);
    this.showDialog.set(true);
  }

  openEditDialog(note: Note) {
    this.selectedNoteToEdit.set(note);
    this.showDialog.set(true);
  }

  saveNote(noteRequest: NoteFormModel) {
    const editingNote = this.selectedNoteToEdit();
    if (editingNote) {
      this.noteStore.updateNote(editingNote.id, { ...editingNote, ...noteRequest });
    } else {
      this.noteStore.createNote(noteRequest);
    }
    this.selectedNoteToEdit.set(null);
    this.showDialog.set(false);
  }
}
