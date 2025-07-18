import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-country-page',
    imports: [],
    templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
    code = inject(ActivatedRoute).snapshot.params['code'];
    countryService = inject(CountryService);
    countryResource = rxResource({
        params: () => this.code,
        stream: ({ params: code }) => {
            return this.countryService.searchCountryByCode(code);
        },
    });
}
