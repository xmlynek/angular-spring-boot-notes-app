import {Component, inject, input, output, signal} from '@angular/core';
import {TagModule} from "primeng/tag";
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {ModalComponent} from "../../../shared/modal/modal.component";
import {NoteFormComponent} from "../note-form/note-form.component";
import {NoteFormModel} from "../note-form/note-form.model";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Router} from "@angular/router";
import {DeleteButtonComponent} from "../../../shared/delete-button/delete-button.component";
import {Note} from "../../../core/modules/openapi";
import {NoteStore} from "../note.store";

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

  private noteStore = inject(NoteStore);
  private router = inject(Router);

  updated = output<void>();

  note = input.required<Note>();
  isEditNoteModalShow = signal<boolean>(false);

  handleNoteUpdate(updateNoteData: NoteFormModel) {
    this.noteStore.updateNote(this.note().id, updateNoteData);
    this.isEditNoteModalShow.set(false);
    this.updated.emit();
  }

  handleNoteDelete() {
    this.noteStore.deleteNote(this.note().id);
    this.router.navigate(['/notes'], {replaceUrl: true});
  }
}
