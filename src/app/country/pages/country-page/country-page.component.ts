import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
    selector: 'app-country-page',
    imports: [NotFoundComponent, CountryInformationComponent],
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
