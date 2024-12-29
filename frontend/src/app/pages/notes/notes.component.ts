import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";
import {Note} from "../../core/modules/openapi";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TextareaModule} from "primeng/textarea";
import {NotesStore} from "../../store/notes.store";
import {
  LoadingContentWrapperComponent
} from "../../shared/loading-content-wrapper/loading-content-wrapper.component";

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
    ProgressSpinnerModule,
    LoadingContentWrapperComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

  private readonly notesStore = inject(NotesStore)
  notes = this.notesStore.sortedNotes;
  isLoading = this.notesStore.isLoading;
  error = this.notesStore.error;

  isDialogShown = signal<boolean>(false);
  selectedNoteToEdit = signal<Note | null>(null);

  constructor() {
    this.notesStore.loadAllNotes();
  }

  createNewNote() {
    this.selectedNoteToEdit.set(null);
    this.isDialogShown.set(true);
  }

  openEditDialog(note: Note) {
    this.selectedNoteToEdit.set(note);
    this.isDialogShown.set(true);
  }

  async saveNote(noteRequest: NoteFormModel) {
    const editingNote = this.selectedNoteToEdit();
    if (editingNote) {
      await this.notesStore.updateNote(editingNote.id, { ...editingNote, ...noteRequest });
    } else {
      await this.notesStore.createNote(noteRequest);
    }
    this.selectedNoteToEdit.set(null);
    this.isDialogShown.set(false);
  }
}
