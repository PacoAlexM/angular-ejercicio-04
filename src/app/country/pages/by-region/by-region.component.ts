import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
    selector: 'app-by-region',
    imports: [CountryListComponent],
    templateUrl: './by-region.component.html',
})
export class ByRegionComponent {
    countryService = inject(CountryService);
    selectedRegion = signal<Region|null>(null);

    countryResource = rxResource({
        params: () => this.selectedRegion(),
        stream: ({ params: region }) => {
            if (!region) return of([]);

            return this.countryService.seacrhByRegion(region);
        },
    });

    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ];

    // selectRegion(region: Region) {
    //     this.selectedRegion.set(region);
    // }
}
