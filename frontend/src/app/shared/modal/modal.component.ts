import {Component, effect, input, model, output} from '@angular/core';
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  title = input<string>('Create Note')
  visible = model.required<boolean>();
  visibleChange = output<boolean>();

  constructor() {
    effect(() => {
      this.visibleChange.emit(this.visible());
    });
  }
}
