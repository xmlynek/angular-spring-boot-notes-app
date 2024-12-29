import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {NoteDetailsComponent} from "../../components/notes/note-details/note-details.component";
import {NotesStore} from "../../store/notes.store";
import {
  LoadingContentWrapperComponent
} from "../../shared/loading-content-wrapper/loading-content-wrapper.component";
import {Note} from "../../core/modules/openapi";

@Component({
  selector: 'app-note-page',
  imports: [
    NoteDetailsComponent,
    LoadingContentWrapperComponent,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePageComponent {

  private readonly notesStore = inject(NotesStore);

  noteId = input.required<string>();
  note = input.required<Note | null>();
  isLoading = this.notesStore.isLoading;
  error = this.notesStore.error;

}
