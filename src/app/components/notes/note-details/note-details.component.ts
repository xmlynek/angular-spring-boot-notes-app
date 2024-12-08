import {Component, inject, input, signal} from '@angular/core';
import {Note} from "../notes.model";
import {TagModule} from "primeng/tag";
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {ModalComponent} from "../../../shared/modal/modal.component";
import {NoteFormComponent} from "../note-form/note-form.component";
import {NoteFormModel} from "../note-form/note-form.model";
import {NotesService} from "../notes.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";
import {DeleteButtonComponent} from "../../../shared/delete-button/delete-button.component";

@Component({
  selector: 'app-note-details',
  imports: [
    TagModule,
    DatePipe,
    CardModule,
    ButtonDirective,
    ModalComponent,
    NoteFormComponent,
    ConfirmDialogModule,
    DeleteButtonComponent
  ],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {

  private notesService = inject(NotesService);
  private router = inject(Router);

  note = input.required<Note>();
  isEditNoteModalShow = signal<boolean>(false);

  handleNoteUpdate(updateNoteData: NoteFormModel) {
    this.notesService.updateNote(this.note().id, updateNoteData);
    this.isEditNoteModalShow.set(false);
  }

  handleNoteDelete() {
    this.notesService.deleteNote(this.note().id);
    this.router.navigate(['/notes']);
  }
}
