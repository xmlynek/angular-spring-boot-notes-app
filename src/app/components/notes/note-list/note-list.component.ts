import {Component, computed, inject, input, signal, Signal} from '@angular/core';
import {NoteComponent} from "../note/note.component";
import {Note} from "../notes.model";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {NotesService} from "../notes.service";
import {ToolbarComponent} from "../../../shared/toolbar/toolbar.component";

@Component({
  selector: 'app-note-list',
  imports: [
    NoteComponent, RouterLink, CardModule
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {

  private notesService = inject(NotesService);

  notes = this.notesService.notes;
  sortedNotes = computed(() => this.notes().sort((a, b) => {
    const pinnedComparison = Number(b.isPinned) - Number(a.isPinned);

    if (pinnedComparison === 0) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return pinnedComparison;
  }))

}
