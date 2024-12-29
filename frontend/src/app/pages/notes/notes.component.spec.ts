import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import {provideExperimentalZonelessChangeDetection, signal} from "@angular/core";
import {Note} from "../../core/modules/openapi";
import {By} from "@angular/platform-browser";
import {NotesStore} from "../../store/notes.store";
import {NoteFormModel} from "../../components/notes/note-form/note-form.model";
import {routes} from "../../app.routes";
import {provideRouter} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

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

  const notesStoreMock = {
    notes: signal(mockNotes),
    sortedNotes: signal(mockNotes),
    isLoading: signal(false),
    error: signal<string | null>(null),
    updateNote: jasmine.createSpy(),
    loadAllNotes: jasmine.createSpy(),
    createNote: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent, BrowserAnimationsModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter(routes),
        ConfirmationService,
        {provide: NotesStore, useValue: notesStoreMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(notesStoreMock.loadAllNotes).toHaveBeenCalled();
  });

  it('should display the "Create Note" button', () => {
    const createButton = fixture.debugElement.query(By.css('.actions button'));
    expect(createButton).toBeTruthy();
    expect(createButton.nativeElement.textContent).toContain('Create Note');
  });

  it('should show the list of notes', () => {
    const noteList = fixture.debugElement.queryAll(By.css('app-note-list'));
    expect(noteList).toBeTruthy();
  });

  it('should open the dialog for creating a new note', () => {
    const createButton = fixture.debugElement.query(By.css('.actions button'));
    createButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.isDialogShown()).toBeTrue();
    expect(component.selectedNoteToEdit()).toBeNull();
  });

  it('should open the dialog for editing a note', () => {
    const editNote = mockNotes[0];
    component.openEditDialog(editNote);

    expect(component.isDialogShown()).toBeTrue();
    expect(component.selectedNoteToEdit()).toEqual(editNote);
  });

  it('should call createNote when saving a new note', async () => {
    const newNote: NoteFormModel = {
      name: 'New Note',
      content: 'New Note Content',
      tags: ['new'],
    };

    component.createNewNote();
    await component.saveNote(newNote);

    expect(notesStoreMock.createNote).toHaveBeenCalledWith(newNote);
    expect(component.isDialogShown()).toBeFalse();
  });

  it('should call updateNote when saving an existing note', async () => {
    const editNote = mockNotes[0];
    const updatedNote: NoteFormModel = {
      name: 'Updated Note',
      content: 'Updated Content',
      tags: ['updated'],
    };

    component.openEditDialog(editNote);
    await component.saveNote(updatedNote);

    expect(notesStoreMock.updateNote).toHaveBeenCalledWith(editNote.id, {
      ...editNote,
      ...updatedNote,
    });
    expect(component.isDialogShown()).toBeFalse();
  });

  it('should display the loading spinner when isLoading is true', () => {
    notesStoreMock.isLoading.set(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('p-progressspinner'));
    expect(spinner).toBeTruthy();
  });

});
