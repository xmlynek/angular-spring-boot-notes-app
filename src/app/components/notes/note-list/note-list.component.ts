import {Component, input, signal, Signal} from '@angular/core';
import {NoteComponent} from "../note/note.component";
import {Note} from "../note/note.model";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    NoteComponent
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {

  notes: Signal<Array<Note>> = signal([
    {
      id: '1',
      name: 'Note 1',
      content: 'This is a sample note.',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: false,
      isArchived: false,
    },
    {
      id: '2',
      name: 'Note 2',
      content: 'Another sample note.',
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '123',
      tags: ['sample', 'tag'],
      isPinned: false,
      isArchived: false,
    },
  ]);

}
