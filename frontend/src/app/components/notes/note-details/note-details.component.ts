import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
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
import {NotesStore} from "../../../store/notes.store";

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
  styleUrl: './note-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailsComponent {

  private readonly notesStore = inject(NotesStore);
  private router = inject(Router);

  note = input.required<Note>();
  isEditNoteModalShow = signal<boolean>(false);

  async handleNoteUpdate(updateNoteData: NoteFormModel) {
    await this.notesStore.updateNote(this.note().id, updateNoteData);
    this.isEditNoteModalShow.set(false);
  }

  async handleNoteDelete() {
    this.notesStore.deleteNote(this.note().id)
      .then(() => {
        this.router.navigate(['/notes'], {replaceUrl: true})
      });
  }
}
