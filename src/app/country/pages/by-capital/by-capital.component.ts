import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input.component";
import { CountryListComponent } from '../../components/country-list.component';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-by-capital',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {
    countryService = inject(CountryService);

    isLoading = signal(false);
    isError = signal<string|null>(null);
    countries = signal<Country[]>([]);

    onSearch(query: string) {
        if (this.isLoading()) return;

        this.isLoading.set(true);
        this.isError.set(null);

        // console.log(this.countryService.serachByCapital(query));
        this.countryService.serachByCapital(query)
            .subscribe(countries => {
                this.isLoading.set(false);
                this.countries.set(countries);

                // const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);

                console.log(countries);
            });
    }
}
