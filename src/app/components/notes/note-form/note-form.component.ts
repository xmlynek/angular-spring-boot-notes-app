import {Component, inject, input, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {Note} from "../note/note.model";

@Component({
    selector: 'app-note-form',
    imports: [ReactiveFormsModule, ButtonDirective],
    templateUrl: './note-form.component.html',
    styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  initialData = input<Note>();

  noteForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(32)]],
    content: ['', [Validators.required, Validators.maxLength(1024)]],
    tags: this.formBuilder.array([this.formBuilder.control('')]),
  })

  ngOnInit(): void {
    if (this.initialData()) {
      const {name, content, tags} = this.initialData()!;
      this.noteForm.patchValue({name, content})
      this.tags.clear();
      tags.forEach((tag) => this.addTag(tag));
    }
  }

  get tags() {
    return this.noteForm.controls.tags as FormArray;
  }

  addTag(value?: string) {
    this.tags.push(this.formBuilder.control(value || ''));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }
}
