import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {NoteCardComponent} from "../note/note-card.component";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Note} from "../../../core/modules/openapi";

@Component({
  selector: 'app-note-list',
  imports: [
    NoteCardComponent, RouterLink, CardModule, ConfirmDialogModule
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent {

  notes = input.required<Note[]>();
  edit = output<Note>();

  onEditNote(note: Note) {
    this.edit.emit(note);
  }

}
