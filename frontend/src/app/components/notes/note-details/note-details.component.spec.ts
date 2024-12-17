import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailsComponent } from './note-details.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {NoteStore} from "../note.store";
import {Router} from "@angular/router";
import {Note} from "../../../core/modules/openapi";
import {NoteFormModel} from "../note-form/note-form.model";
import {ConfirmationService} from "primeng/api";

describe('NoteDetailsComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;
  let mockNoteStore: jasmine.SpyObj<NoteStore>;
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

  beforeEach(async () => {
    mockNoteStore = jasmine.createSpyObj<NoteStore>('NoteStore', ['updateNote', 'deleteNote']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NoteDetailsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ConfirmationService,
        { provide: NoteStore, useValue: mockNoteStore },
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

  it('should handle note updates correctly', () => {
    const updateNoteData: NoteFormModel = {
      name: 'Updated Note Title',
      content: 'Updated Note Content',
      tags: ['updated'],
    };

    spyOn(component.updated, 'emit');

    component.handleNoteUpdate(updateNoteData);

    expect(mockNoteStore.updateNote).toHaveBeenCalledWith(mockNote.id, updateNoteData);
    expect(component.isEditNoteModalShow()).toBe(false);
    expect(component.updated.emit).toHaveBeenCalled();
  });

  it('should handle note delete correctly', () => {
    component.handleNoteDelete();

    expect(mockNoteStore.deleteNote).toHaveBeenCalledWith(mockNote.id);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
