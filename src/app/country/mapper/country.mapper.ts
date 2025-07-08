import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
    static mapRestCountryToCountry(item: RESTCountry): Country {
        return {
            cca2: item.cca2,
            flag: item.flag,
            flagSvg: item.flags.svg,
            name: item.name.common,
            capital: item.capital,
            population: item.population,
        };
    }

    static mapRestCountryArrayToCountryArray(items: RESTCountry[]): Country[] {
        return items.map(this.mapRestCountryToCountry);
    }
}
