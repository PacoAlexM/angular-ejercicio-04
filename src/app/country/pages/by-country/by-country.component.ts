import { Component } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input.component";
import { CountryListComponent } from '../../components/country-list.component';

@Component({
    selector: 'app-by-country',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-country.component.html',
})
export class ByCountryComponent {}
