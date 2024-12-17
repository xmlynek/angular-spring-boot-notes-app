import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoteCardComponent} from './note-card.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {NoteStore} from "../note.store";
import {Router} from "@angular/router";
import {Note} from "../../../core/modules/openapi";
import {ConfirmationService} from "primeng/api";

describe('NoteComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
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
      imports: [NoteCardComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {provide: NoteStore, useValue: mockNoteStore},
        {provide: Router, useValue: mockRouter},
        ConfirmationService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("note", mockNote);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the pinned state and call updateNote in NoteStore', () => {
    const mockEvent = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);

    component.togglePinned(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockNoteStore.updateNote).toHaveBeenCalledWith(mockNote.id, {
      ...mockNote,
      isPinned: !mockNote.isPinned
    });
  });

  it('should call deleteNote when delete button is clicked', () => {
    component.handleDelete();
    expect(mockNoteStore.deleteNote).toHaveBeenCalledWith(mockNote.id);
  });

  it('should call updateNote when pinned checkbox is toggled', () => {
    const mockEvent = jasmine.createSpyObj<MouseEvent>('MouseEvent', ['stopPropagation']);

    spyOn(component.edit, 'emit');

    component.handleEdit(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(component.edit.emit).toHaveBeenCalledWith(mockNote);
  });
});
