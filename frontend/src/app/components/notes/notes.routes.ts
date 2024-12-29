import {Routes} from "@angular/router";
import {NotesComponent} from "../../pages/notes/notes.component";
import {NotePageComponent} from "../../pages/note/note.component";
import {resolveNote, resolveNoteTitle} from "./notes.resolvers";

export const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
  {
    path: ':noteId',
    component: NotePageComponent,
    title: resolveNoteTitle,
    runGuardsAndResolvers: 'always',
    resolve: {
      note: resolveNote
    }
  },
]
