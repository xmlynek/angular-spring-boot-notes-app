import {Component, inject, input, output} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-delete-button',
  imports: [
    ConfirmDialogModule,
    ButtonDirective
  ],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
})
export class DeleteButtonComponent {

  private confirmationService = inject(ConfirmationService);

  title = input<string>('Delete Note');
  onConfirm = output<void>();

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.handleDelete();
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT || type === ConfirmEventType.CANCEL) {
          console.log('Delete action cancelled');
        }
      },
    });
  }

  handleDelete() {
    this.onConfirm.emit();
  }

}
