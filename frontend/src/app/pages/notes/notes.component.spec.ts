import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {NoteStore} from "../../components/notes/note.store";
import {Note} from "../../core/modules/openapi";
import {createSignal} from "@angular/core/primitives/signals";
import {By} from "@angular/platform-browser";
import {NoteFormComponent} from "../../components/notes/note-form/note-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {provideHttpClient} from "@angular/common/http";
import {NoteListComponent} from "../../components/notes/note-list/note-list.component";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let mockNoteStore: jasmine.SpyObj<NoteStore>;

  const mockNotes: Note[] = [
    {
      id: '1',
      name: 'Test Note 1',
      content: 'Content 1',
      tags: ['test'],
      authorId: 'user1',
      isPinned: false,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Test Note 2',
      content: 'Content 2',
      tags: ['test2'],
      authorId: 'user2',
      isPinned: true,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    mockNoteStore = jasmine.createSpyObj<NoteStore>('NoteStore', ['updateNote', 'reloadNotes', 'createNote'], {
      notes: createSignal(mockNotes),
    });

    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideRouter([]),
        {provide: NoteStore, useValue: mockNoteStore},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockNoteStore.reloadNotes).toHaveBeenCalled();
  });

  it('should display the "Create Note" button', () => {
    const createButton = fixture.debugElement.query(By.css('.actions button'));
    expect(createButton).toBeTruthy();
    expect(createButton.nativeElement.textContent).toContain('Create Note');
  });
});
