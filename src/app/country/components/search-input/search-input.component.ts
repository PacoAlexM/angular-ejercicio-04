import { Component, effect, input, output, signal } from '@angular/core';

@Component({
    selector: 'search-input',
    imports: [],
    templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
    placeholder = input('Buscar');
    value = output<string>();

    inputValue = signal<string>('');

    debounceEffect = effect((onClean) => {
        const value = this.inputValue();
        const timeout = setTimeout(() => {
            this.value.emit(value);
        }, 500);

        onClean(() => {
            clearTimeout(timeout);
        });
    });
}
