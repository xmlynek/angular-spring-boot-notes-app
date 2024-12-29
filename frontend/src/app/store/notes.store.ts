import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {Note, NoteRequest, NotesService} from "../core/modules/openapi";
import {computed, inject} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {NoteFormModel} from "../components/notes/note-form/note-form.model";

export type NotesState = {
  notes: Note[],
  selectedNote: Note | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
};

export const NotesStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withComputed(({notes}) => ({
    notesCount: computed<number>(() => notes().length),
    sortedNotes: computed<Note[]>(() => [...notes()].sort((a, b) => {
      const pinnedComparison = Number(b.isPinned) - Number(a.isPinned);
      if (pinnedComparison === 0) {
        return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
      }
      return pinnedComparison;
    })),
  })),

  withMethods((store, notesService = inject(NotesService)) => ({
    async loadAllNotes() {
      patchState(store, {isLoading: true, error: null});
      try {
        const notes = await firstValueFrom(notesService.getNotes())
        patchState(store, {notes, isLoading: false});
      } catch (error: any) {
        patchState(store, {error: 'Failed to fetch notes', isLoading: false});
        console.error(error);
      }
    },

    async loadNoteById(noteId: string) {
      patchState(store, {isLoading: true, error: null, selectedNote: null});
      try {
        const note = await firstValueFrom(notesService.getNoteById(noteId));
        patchState(store, {selectedNote: note, isLoading: false});
      } catch (error) {
        patchState(store, {error: `Failed to load note with ID ${noteId}`, isLoading: false});
        console.error(error);
      }
    },

    async createNote(note: NoteFormModel) {
      patchState(store, {isLoading: true, error: null});
      try {
        await firstValueFrom(notesService.createNote({...note, isPinned: false}));
        await this.loadAllNotes();
      } catch (error: any) {
        patchState(store, {error: 'Failed to create note', isLoading: false});
        console.error(error);
      }
    },

    async updateNote(noteId: string, note: NoteRequest) {
      patchState(store, {isLoading: true, error: null});
      try {
        const updatedNote = await firstValueFrom(notesService.updateNote(noteId, note));
        await this.loadAllNotes();
        if (store.selectedNote()) {
          patchState(store, {selectedNote: updatedNote});
        }
      } catch (error) {
        patchState(store, {error: 'Failed to update note', isLoading: false});
        console.error(error);
      }
    },

    async deleteNote(noteId: string) {
      patchState(store, {isLoading: true, error: null});
      try {
        await firstValueFrom(notesService.deleteNote(noteId));
        await this.loadAllNotes();
      } catch (error) {
        patchState(store, {error: 'Failed to delete note', isLoading: false});
        console.error(error);
      }
    },
  }))
);
