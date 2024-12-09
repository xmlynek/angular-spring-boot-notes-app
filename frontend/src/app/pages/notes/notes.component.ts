import {Component, inject, signal} from '@angular/core';
import {Note} from "../../components/notes/notes.model";
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";
import {NotesService} from "../../components/notes/notes.service";

@Component({
  selector: 'app-notes',
  imports: [
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

  private notesService = inject(NotesService);
  selectedNote = signal<Note | null>(null); // For modifying notes
  showDialog = signal<boolean>(false); // For showing the create/edit dialog


  createNewNote() {
    this.selectedNote.set(null); // Clear selection
    this.showDialog.set(true); // Show dialog
  }

  saveNote(noteRequest: NoteFormModel) {
    this.notesService.addNote({
      ...noteRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "xd",
      isPinned: false,
      id: Math.random().toString(36)
    })
    this.showDialog.set(false);
  }


}
