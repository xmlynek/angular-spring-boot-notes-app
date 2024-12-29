import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {NotesStore} from "../../store/notes.store";
import {Note} from "../../core/modules/openapi";

export const resolveNote: ResolveFn<Note | null> = async (route: ActivatedRouteSnapshot,
                                                          state: RouterStateSnapshot) => {
  const notesStore = inject(NotesStore);
  const noteId = route.paramMap.get('noteId');

  return noteId ? notesStore.loadNoteById(noteId).then(notesStore.selectedNote) : null;
}

export const resolveNoteTitle: ResolveFn<string> = async (route: ActivatedRouteSnapshot,
                                                          state: RouterStateSnapshot) => {
  const resolvedNote = await resolveNote(route, state) as Note;

  return resolvedNote ? `${resolvedNote?.name} Note` : 'Unknown Note';
}
