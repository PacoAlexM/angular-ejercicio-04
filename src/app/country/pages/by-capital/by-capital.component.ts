import { Component, inject, linkedSignal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// import { firstValueFrom } from 'rxjs';
// import type { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-by-capital',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {
    countryService = inject(CountryService);
    activeRoute = inject(ActivatedRoute);
    router = inject(Router);
    queryParam = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';
    query = linkedSignal(() => this.queryParam);

    countryResource = rxResource({
        params: () => this.query(),
        stream: ({ params: query }) => {
            if (!query) return of([]);

            this.router.navigate(['/country/by-capital'], { queryParams: { query, } });

            return this.countryService.searchByCapital(query)
        },
    });

    // countryResource = resource({
    //     params: () => ({ query: this.query() }),
    //     loader: async ({ params }) => {
    //         const { query } = params;
    // 
    //         if (!query) return [];
    // 
    //         return await firstValueFrom(this.countryService.searchByCapital(query));
    //     }
    // });

    // isLoading = signal(false);
    // isError = signal<string|null>(null);
    // countries = signal<Country[]>([]);
    // 
    // onSearch(query: string) {
    //     if (this.isLoading()) return;
    // 
    //     this.isLoading.set(true);
    //     this.isError.set(null);
    // 
    //     // console.log(this.countryService.serachByCapital(query));
    //     this.countryService.serachByCapital(query)
    //         .subscribe({
    //             next: countries => {
    //                 this.isLoading.set(false);
    //                 this.countries.set(countries);
    //             },
    //             error: err => {
    //                 this.isLoading.set(false);
    //                 this.countries.set([]);
    //                 this.isError.set(err);
    //             },
    //         });
    // }
}
