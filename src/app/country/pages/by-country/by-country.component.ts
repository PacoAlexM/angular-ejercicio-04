import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input.component";
import { CountryListComponent } from '../../components/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-by-country',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
    countryService = inject(CountryService);
    query = signal('');

    countryResource = resource({
        params: () => ({ query: this.query() }),
        loader: async ({ params }) => {
            const { query } = params;

            if (!query) return [];

            return await firstValueFrom(this.countryService.searchByCountry(query));
        }
    });
}
