import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input.component";
import { CountryListComponent } from '../../components/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
// import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-by-country',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
    countryService = inject(CountryService);
    query = signal('');

    countryResource = rxResource({
        params: () => this.query(),
        stream: ({ params: query }) => {
            if (!query) return of([]);

            return this.countryService.searchByCountry(query);
        },
    });

    // countryResource = resource({
    //     params: () => ({ query: this.query() }),
    //     loader: async ({ params }) => {
    //         const { query } = params;
    // 
    //         if (!query) return [];
    // 
    //         return await firstValueFrom(this.countryService.searchByCountry(query));
    //     }
    // });
}
