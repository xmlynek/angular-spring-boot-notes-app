import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-homepage',
    imports: [
        ButtonDirective,
        DividerModule,
        CardModule,
        RouterLink
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
