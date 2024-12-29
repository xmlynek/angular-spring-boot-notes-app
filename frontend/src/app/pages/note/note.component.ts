import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {NoteDetailsComponent} from "../../components/notes/note-details/note-details.component";
import {NotesStore} from "../../store/notes.store";
import {
  LoadingContentWrapperComponent
} from "../../shared/loading-content-wrapper/loading-content-wrapper.component";

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
export class NotePageComponent implements OnInit {

  private readonly notesStore = inject(NotesStore);

  noteId = input.required<string>();
  noteById = this.notesStore.selectedNote;
  isLoading = this.notesStore.isLoading;
  error = this.notesStore.error;

  ngOnInit(): void {
    this.notesStore.loadNoteById(this.noteId());
  }

}
