import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {NoteDetailsComponent} from "../../components/notes/note-details/note-details.component";
import {rxResource} from "@angular/core/rxjs-interop";
import {NotesService} from "../../core/modules/openapi";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";

@Component({
  selector: 'app-note-page',
  imports: [
    NoteDetailsComponent,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePageComponent {

  noteId = input.required<string>();
  private notesService = inject(NotesService);

  noteResourceRef = rxResource({
    request: () => this.noteId(),
    loader: ({request}) => this.notesService.getNoteById(request)
  })

  noteById = computed(() => this.noteResourceRef.value())

  handleUpdate(updateNoteData: NoteFormModel) {
    this.noteResourceRef.update(actualNote => ({...actualNote!, ...updateNoteData}));
  }

}
