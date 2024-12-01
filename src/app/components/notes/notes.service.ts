import {Injectable, signal, WritableSignal} from "@angular/core";
import {Note} from "./notes.model";

@Injectable({providedIn: 'root'})
export class NotesService {
  private notesArr: WritableSignal<Array<Note>> = signal([
    {
      id: '1',
      name: 'Note 1',
      content: 'This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.This is a sample note.',
      createdAt: new Date(2024, 1, 1, 7, 5, 14),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: true,
      isArchived: false,
    },
    {
      id: '2',
      name: 'Note 2',
      content: 'Another sample note. xd xd',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: false,
      isArchived: true,
    },
  ]);

  get notes() {
    return this.notesArr.asReadonly();
  }

  addNote(note: Note) {
    this.notesArr.update((prevNotes) => [...prevNotes, note]);
  }

  updateNote(note: Note) {
    this.notesArr.update((prevNotes) => prevNotes.map(n => n.id === note.id? note : n));
  }

  deleteNote(noteId: string) {
    this.notesArr.update((prevNotes) => prevNotes.filter(n => n.id!== noteId));
  }

  getNoteById(noteId: string) {
    return this.notesArr().find(n => n.id === noteId);
  }


}
