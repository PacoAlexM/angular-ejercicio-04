import { Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const validateRegion = (queryRegion: string): Region => {
    const query = queryRegion.toLocaleLowerCase();
    const validRegions: Record<string, Region> = {
        africa: 'Africa',
        americas: 'Americas',
        asia: 'Asia',
        europe: 'Europe',
        oceania: 'Oceania',
        antarctic: 'Antarctic',
    }

    return validRegions[query] ?? 'Americas';
}

@Component({
    selector: 'app-by-region',
    imports: [CountryListComponent],
    templateUrl: './by-region.component.html',
})
export class ByRegionComponent {
    countryService = inject(CountryService);
    activeRoute = inject(ActivatedRoute);
    router = inject(Router);
    queryParam = this.activeRoute.snapshot.queryParamMap.get('region') ?? '';
    selectedRegion = linkedSignal<Region|null>(() => validateRegion(this.queryParam));

    countryResource = rxResource({
        params: () => this.selectedRegion(),
        stream: ({ params: region }) => {
            if (!region) return of([]);

            this.router.navigate(['/country/by-region'], { queryParams: { region, } });

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
