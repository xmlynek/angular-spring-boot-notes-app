import {Component, signal, Signal, WritableSignal} from '@angular/core';
import {Note} from "../../components/notes/note/note.model";
import {DialogModule} from "primeng/dialog";
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/components/modal/modal.component";

@Component({
  selector: 'app-notes',
  imports: [DialogModule,
    NoteListComponent,
    NoteFormComponent,
    ModalComponent,
    ButtonDirective,
    FormsModule,
    InputTextModule,
    InputTextareaModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  notes: WritableSignal<Array<Note>> = signal([
    {
      id: '1',
      name: 'Note 1',
      content: 'This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: true,
      isArchived: false,
    },
    {
      id: '2',
      name: 'Note 2',
      content: 'Another sample note.',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: false,
      isArchived: true,
    },
  ]);

  selectedNote = signal<Note | null>(null); // For modifying notes
  showDialog = signal(false); // For showing the create/edit dialog

  hideDialog() {
    this.showDialog.set(false);
  }

  createNewNote() {
    this.selectedNote.set(null); // Clear selection
    this.showDialog.set(true); // Show dialog
  }

  editNote(note: Note) {
    this.selectedNote.set(note); // Set the selected note
    this.showDialog.set(true); // Show dialog
  }

  saveNote(newNote: Note) {
    const existingNote = this.notes().find((n) => n.id === newNote.id);
    if (existingNote) {
      // Update existing note
      this.notes.update((notes) =>
        notes.map((n) => (n.id === newNote.id ? {...n, ...newNote} : n))
      );
    } else {
      // Add new note
      this.notes.update((notes) => [
        ...notes,
        {...newNote, id: String(Date.now()), createdAt: new Date(), updatedAt: new Date()},
      ]);
    }
    this.showDialog.set(false); // Close dialog
  }

  deleteNote(noteId: string) {
    this.notes.update((notes) => notes.filter((n) => n.id !== noteId));
  }

}
