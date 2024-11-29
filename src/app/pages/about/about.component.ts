import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-about',
    imports: [
        CardModule,
        ButtonDirective
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

}
