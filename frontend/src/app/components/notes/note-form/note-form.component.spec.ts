import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoteFormComponent} from './note-form.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";
import {Note} from "../../../core/modules/openapi";
import {By} from "@angular/platform-browser";

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;

  let mockInitialData: Note = {
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
    await TestBed.configureTestingModule({
      imports: [NoteFormComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("initialData", null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when no initialData is provided', () => {
    expect(component.noteForm.value).toEqual({
      name: null,
      content: null,
      tags: [],
    });
  });

  it('should populate form when initialData is provided', () => {
    fixture.componentRef.setInput("initialData", mockInitialData);
    fixture.detectChanges();

    expect(component.noteForm.value).toEqual({
      name: mockInitialData.name,
      content: mockInitialData.content,
      tags: mockInitialData.tags,
    });
  });

  it('should add a tag', () => {
    component.addTag('newTag');
    fixture.detectChanges();

    expect(component.tags.length).toBe(1);
    expect(component.tags.at(0)?.value).toBe('newTag');
  });

  it('should remove a tag', () => {
    component.addTag('tagToRemove');
    fixture.detectChanges();

    component.removeTag(0);
    fixture.detectChanges();

    expect(component.tags.length).toBe(0);
  });

  it('should emit formSubmit with valid data on submit and not reset form', () => {
    const formSubmitSpy = spyOn(component.formSubmit, 'emit');
    fixture.componentRef.setInput("initialData", {
      name: 'New Note',
      content: 'This is a new note content',
      tags: ['tag1', 'tag2'],
    });
    fixture.detectChanges();

    component.handleSubmit();

    const resetSpy = spyOn(component.noteForm, 'reset');

    expect(formSubmitSpy).toHaveBeenCalledWith({
      name: 'New Note',
      content: 'This is a new note content',
      tags: ['tag1', 'tag2'],
    });
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should emit formSubmit with valid data on submit and reset form', () => {
    const formSubmitSpy = spyOn(component.formSubmit, 'emit');
    const resetSpy = spyOn(component.noteForm, 'reset');

    component.noteForm.patchValue({
      name: 'New Note',
      content: 'This is a new note content',
      tags: [],
    });
    fixture.detectChanges();

    component.handleSubmit();

    expect(formSubmitSpy).toHaveBeenCalledWith({
      name: 'New Note',
      content: 'This is a new note content',
      tags: [],
    });
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should not emit formSubmit if form is invalid', () => {
    const formSubmitSpy = spyOn(component.formSubmit, 'emit');
    component.noteForm.patchValue({
      name: '',
      content: 'Invalid because name is empty',
      tags: ['tag1', 'tag2'],
    });

    component.handleSubmit();
    fixture.detectChanges();

    expect(formSubmitSpy).not.toHaveBeenCalled();
  });

  it('should mark form control as invalid if touched, dirty, and invalid', () => {
    const control = component.noteForm.controls.name as any;
    control.markAsTouched();
    control.markAsDirty();
    control.setErrors({ required: true });

    expect(component.isFormControlInvalid(control)).toBeTrue();
  });

  it('should render form inputs correctly', () => {
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
    const contentTextarea = fixture.debugElement.query(By.css('textarea[formControlName="content"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(nameInput).toBeTruthy();
    expect(contentTextarea).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should disable the submit button when the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when the form is valid', async () => {
    fixture.componentRef.setInput("initialData", mockInitialData);

    fixture.detectChanges();

    await fixture.whenStable();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeFalse();
  });


});
