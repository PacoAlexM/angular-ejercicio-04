import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private http = inject(HttpClient);

    serachByCapital(query: string): Observable<Country[]> {
        const lowerQuery = query.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerQuery}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${query}`))
                })
            );
    }
}
