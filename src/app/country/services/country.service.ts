import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private http = inject(HttpClient);
    private queryCacheCapital = new Map<string, Country[]>();
    private queryCacheCountry = new Map<string, Country[]>();
    private queryCacheRegion = new Map<string, Country[]>();

    searchByCapital(query: string): Observable<Country[]> {
        const lowerQuery = query.toLowerCase();

        if (this.queryCacheCapital.has(lowerQuery))
            return of(this.queryCacheCapital.get(lowerQuery)!);

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerQuery}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                tap(countries => this.queryCacheCapital.set(lowerQuery, countries)),
                delay(500),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${query}`))
                })
            );
    }

    searchByCountry(query: string): Observable<Country[]> {
        const lowerQuery = query.toLowerCase();

        if (this.queryCacheCountry.has(lowerQuery))
            return of(this.queryCacheCountry.get(lowerQuery)!);

        return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerQuery}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                tap(countries => this.queryCacheCountry.set(lowerQuery, countries)),
                delay(500),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${query}`))
                })
            );
    }

    seacrhByRegion(region: Region): Observable<Country[]> {
        if (this.queryCacheRegion.has(region))
            return of(this.queryCacheRegion.get(region)!);

        return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
            .pipe(
                map(res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
                tap(countries => this.queryCacheRegion.set(region, countries)),
                delay(500),
                catchError(error => {
                    return throwError(() => new Error(`No se encontró información con: ${region}`))
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
