import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private http = inject(HttpClient);

    searchByCapital(query: string): Observable<Country[]> {
        const lowerQuery = query.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerQuery}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                delay(500),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${query}`))
                })
            );
    }

    searchByCountry(query: string): Observable<Country[]> {
        const lowerQuery = query.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerQuery}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${query}`))
                })
            );
    }

    searchCountryByCode(code: string) {
        const lowerCode = code.toLowerCase();

        return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${lowerCode}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                map(countries => countries.at(0)),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${code}`))
                })
            );
    }
}
