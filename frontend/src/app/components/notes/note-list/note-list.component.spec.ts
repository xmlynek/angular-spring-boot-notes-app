import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoteListComponent} from './note-list.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {Note} from "../../../core/modules/openapi";
import {ActivatedRoute, provideRouter} from "@angular/router";
import {NoteStore} from "../note.store";
import {routes} from "../../../app.routes";
import {ConfirmationService} from "primeng/api";

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let mockNotes: Note[] = [
    {
      id: '1',
      name: 'Old Note Title',
      content: 'Old Note Content',
      tags: ['old'],
      authorId: "id",
      isPinned: false,
      updatedAt: new Date(2014, 11, 11).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Random name',
      content: 'New content',
      tags: ['new'],
      authorId: "id2",
      isPinned: true,
      updatedAt: new Date(2020, 7, 7).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Random name 2',
      content: 'New content 2',
      tags: ['new', 'old'],
      authorId: "id3",
      isPinned: false,
      updatedAt: new Date(2024, 1, 1).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  const fakeActivatedRoute = {
    snapshot: {data: {}}
  } as ActivatedRoute;

  beforeEach(async () => {
    let mockNoteStore = jasmine.createSpyObj<NoteStore>('NoteStore', ['updateNote', 'deleteNote']);

    await TestBed.configureTestingModule({
      imports: [NoteListComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
        {provide: NoteStore, useValue: mockNoteStore},
        ConfirmationService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("notes", mockNotes)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort notes correctly based on pinned and updatedAt', () => {
    const sorted = component.sortedNotes();

    // Expected order: 2 (pinned), 3 (unpinned), 1 (unpinned)
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });

  it('should emit edit event when onEditNote is called', () => {
    const noteMock = mockNotes[0];

    spyOn(component.edit, 'emit');
    component.onEditNote(noteMock);

    expect(component.edit.emit).toHaveBeenCalledWith(noteMock);
  });
});
