import {Component, computed, inject, input} from '@angular/core';
import {NoteComponent} from "../note/note.component";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {NotesService} from "../notes.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Note} from "../../../core/modules/openapi";

@Component({
  selector: 'app-note-list',
  imports: [
    NoteComponent, RouterLink, CardModule, ConfirmDialogModule
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {

  notes = input.required<Note[]>();

  sortedNotes = computed(() => this.notes().sort((a, b) => {
    const pinnedComparison = Number(b.isPinned) - Number(a.isPinned);

    if (pinnedComparison === 0) {
      return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
    }

    return pinnedComparison;
  }))

}
