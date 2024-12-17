import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFormComponent } from './note-form.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;

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
    fixture.detectChanges();
  });

  // TODO::: test

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
