import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-by-country',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
    countryService = inject(CountryService);
    activeRoute = inject(ActivatedRoute);
    router = inject(Router);
    queryParam = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';
    query = linkedSignal(() => this.queryParam);

    countryResource = rxResource({
        params: () => this.query(),
        stream: ({ params: query }) => {
            if (!query) return of([]);

            this.router.navigate(['/country/by-country'], { queryParams: { query, } });

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
