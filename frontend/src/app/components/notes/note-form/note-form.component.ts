import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output
} from '@angular/core';
import {
  FormBuilder, FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {MessageModule} from "primeng/message";
import {InputTextModule} from "primeng/inputtext";
import {NoteFormModel} from "./note-form.model";
import {Note} from "../../../core/modules/openapi";
import {TextareaModule} from "primeng/textarea";

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule, ButtonDirective, MessageModule, InputTextModule, TextareaModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent {
  protected readonly CONTENT_MAX_LENGTH: number = 4096;
  protected readonly NAME_MAX_LENGTH: number = 64;
  protected readonly TAG_MAX_LENGTH: number = 16;

  private formBuilder = inject(FormBuilder);
  initialData = input.required<Note | null>();
  formSubmit = output<NoteFormModel>();

  noteForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(this.NAME_MAX_LENGTH)]],
    content: ['', [Validators.required, Validators.maxLength(this.CONTENT_MAX_LENGTH)]],
    tags: this.formBuilder.array([]),
  })

  constructor() {
    effect(() => {
      this.tags.clear();
      if (this.initialData()) {
        this.noteForm.patchValue({
          name: this.initialData()!.name,
          content: this.initialData()!.content,
        });
        this.initialData()!.tags?.forEach((tag) => this.addTag(tag));
      } else {
        this.noteForm.reset();
      }
    });
  }

  get tags() {
    return this.noteForm.controls.tags;
  }

  addTag(value?: string) {
    this.tags.push(this.formBuilder.control(value || '', [Validators.required, Validators.maxLength(this.TAG_MAX_LENGTH)]));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  handleSubmit() {
    if (this.noteForm.valid) {
      const values = this.noteForm.value;
      const tags = values.tags ? values.tags.map(value => value as string) : [];
      this.formSubmit.emit({name: values.name!, content: values.content!, tags: tags});
      if (!this.initialData()) {
        this.noteForm.reset();
      }
    }
  }

  isFormControlInvalid(control: FormControl) {
    return (
      control.touched &&
      control.dirty &&
      control.invalid
    )
  }

}
