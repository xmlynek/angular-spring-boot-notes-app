import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
    selector: 'app-about',
  imports: [
    CardModule,
    ButtonDirective,
    ProgressSpinnerModule
  ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

}
