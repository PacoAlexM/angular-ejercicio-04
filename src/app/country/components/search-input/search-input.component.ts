import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
    selector: 'search-input',
    imports: [],
    templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
    placeholder = input('Buscar');
    initialValue = input<string>();
    
    value = output<string>();
    inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

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
