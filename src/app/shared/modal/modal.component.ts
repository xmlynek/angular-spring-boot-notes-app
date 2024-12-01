import {Component, DestroyRef, effect, inject, input, model, output, signal} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";

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
  onConfirm = output<void>();

  private destroyRef = inject(DestroyRef);

  constructor() {
    const sub = this.visible.subscribe((val) => {
      this.visibleChange.emit(val);
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }



}
