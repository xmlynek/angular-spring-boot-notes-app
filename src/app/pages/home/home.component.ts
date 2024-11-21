import { Component } from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ButtonDirective,
    DividerModule,
    Button,
    CardModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
