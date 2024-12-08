import {Component, computed, inject, input} from '@angular/core';
import {NoteComponent} from "../../components/notes/note/note.component";
import {NotesService} from "../../components/notes/notes.service";
import {NoteDetailsComponent} from "../../components/notes/note-details/note-details.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";

@Component({
  selector: 'app-note-page',
  imports: [
    NoteDetailsComponent,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NotePageComponent {

  noteId = input.required<string>();
  private notesService = inject(NotesService);
  noteById = computed(() => this.notesService.notes().find(value => value.id === this.noteId()))

}
