import {Component, input} from '@angular/core';
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
  selector: 'app-loading-content-wrapper',
  imports: [
    ProgressSpinner
  ],
  templateUrl: './loading-content-wrapper.component.html',
  styleUrl: './loading-content-wrapper.component.scss'
})
export class LoadingContentWrapperComponent {

  isLoading = input<boolean>(false);
  error = input<string | null>(null);
  hasData = input<boolean>(false);
  errorFallbackText = input<string>('An error occurred. Please try again later.');

}
