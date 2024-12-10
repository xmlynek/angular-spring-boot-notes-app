import {Component, computed, inject, input, resource} from '@angular/core';
import {NoteDetailsComponent} from "../../components/notes/note-details/note-details.component";
import {NotesService} from "../../core/modules/openapi";
import {rxResource} from "@angular/core/rxjs-interop";

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

  note = rxResource({
    request: this.noteId,
    loader: () => this.notesService.getNoteById(this.noteId())
  })

  noteById = computed(() => this.note.value())

}
