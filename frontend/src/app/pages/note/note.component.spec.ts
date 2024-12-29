import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotePageComponent} from './note.component';
import {provideExperimentalZonelessChangeDetection, signal} from "@angular/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {Note} from "../../core/modules/openapi";
import {NotesStore} from "../../store/notes.store";
import {ConfirmationService} from "primeng/api";

describe('NoteComponent', () => {
  let component: NotePageComponent;
  let fixture: ComponentFixture<NotePageComponent>;
  let mockNote: Note = {
    id: '1',
    name: 'Old Note Title',
    content: 'Old Note Content',
    tags: ['old'],
    authorId: "id",
    isPinned: false,
    updatedAt: new Date(2014, 11, 11).toISOString(),
    createdAt: new Date().toISOString(),
  };

  const notesStoreMock = {
    notes: signal(new Array<Note>()),
    isLoading: signal(false),
    error: signal(null),
    selectedNote: signal(mockNote),
    loadNoteById: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePageComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClientTesting(),
        ConfirmationService,
        provideRouter(routes),
        {provide: NotesStore, useValue: notesStoreMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('noteId', mockNote.id);
    fixture.componentRef.setInput('note', mockNote);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.noteId()).toEqual(mockNote.id);
    expect(component.note()).toEqual(mockNote);
  });
});
