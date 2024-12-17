import {ComponentFixture, TestBed} from '@angular/core/testing';

import { NotePageComponent } from './note.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {Note, NotesService} from "../../core/modules/openapi";
import {of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

describe('NoteComponent', () => {
  let component: NotePageComponent;
  let fixture: ComponentFixture<NotePageComponent>;
  let mockNotesService: jasmine.SpyObj<NotesService>;
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
    mockNotesService = jasmine.createSpyObj<NotesService>('NotesService', ['getNoteById']);

    await TestBed.configureTestingModule({
      imports: [NotePageComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {provide: NotesService, useValue: mockNotesService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('noteId', mockNote.id);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load note by ID using rxResource', async () => {
    const mockHttpEvent: HttpResponse<Note> = new HttpResponse({
      body: mockNote,
    });

    mockNotesService.getNoteById.and.returnValue(of(mockHttpEvent));

    expect(mockNotesService.getNoteById).toHaveBeenCalledWith(mockNote.id);
  });

  it('should reload note resource on handleUpdate', () => {
    spyOn(component.noteResourceRef, 'reload');

    component.handleUpdate();

    expect(component.noteResourceRef.reload).toHaveBeenCalled();
  });

});
