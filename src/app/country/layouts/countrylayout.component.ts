import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../components/top-menu/top-menu.component";

@Component({
    selector: 'country-layout',
    imports: [RouterOutlet, TopMenuComponent],
    templateUrl: './countrylayout.component.html',
})
export class CountryLayoutComponent {}
