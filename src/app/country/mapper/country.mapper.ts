import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
    static mapRestCountryToCountry(item: RESTCountry): Country {
        return {
            cca2: item.cca2,
            flag: item.flag,
            flagSvg: item.flags.svg,
            name: item.name.common,
            nameSpa: item.translations['spa'].common ?? 'No spanish translated',
            capital: item.capital.join(','),
            population: item.population,
        };
    }

    static mapRestCountryArrayToCountryArray(items: RESTCountry[]): Country[] {
        return items.map(this.mapRestCountryToCountry);
    }
}
