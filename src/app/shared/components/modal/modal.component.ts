import {Component, effect, input, output, signal} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-modal',
  imports: [DialogModule, ButtonDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  title = input<string>('Create Note')
  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  onClose = output<void>();
  onConfirm = output<void>();



}
