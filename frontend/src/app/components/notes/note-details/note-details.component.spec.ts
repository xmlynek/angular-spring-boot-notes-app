import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailsComponent } from './note-details.component';
import {provideExperimentalZonelessChangeDetection, signal} from "@angular/core";
import {Router} from "@angular/router";
import {Note} from "../../../core/modules/openapi";
import {NoteFormModel} from "../note-form/note-form.model";
import {ConfirmationService} from "primeng/api";
import {NotesStore} from "../../../store/notes.store";

describe('NoteDetailsComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
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
    updateNote: jasmine.createSpy(),
    deleteNote: jasmine.createSpy().and.callFake(() => Promise.resolve()),
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [NoteDetailsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ConfirmationService,
        { provide: NotesStore, useValue: notesStoreMock },
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('note', mockNote);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle note updates correctly', async () => {
    const updateNoteData: NoteFormModel = {
      name: 'Updated Note Title',
      content: 'Updated Note Content',
      tags: ['updated'],
    };

    await component.handleNoteUpdate(updateNoteData);

    expect(notesStoreMock.updateNote).toHaveBeenCalledWith(mockNote.id, updateNoteData);
    expect(component.isEditNoteModalShow()).toBe(false);
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

  it('should handle note delete correctly', async () => {
    await component.handleNoteDelete();

    expect(notesStoreMock.deleteNote).toHaveBeenCalledWith(mockNote.id);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
