import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CardModule,
    ButtonDirective,
    NgOptimizedImage
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
