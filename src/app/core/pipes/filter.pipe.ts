import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    /**
     * Filters an array based on a callback function and a query. Thus given the callback function
     * (value) => {value == query}, it will filter the array on values that are equal to the query.
     *
     * @param items         Array of items.
     * @param callback      Callback function.
     * @param query         Query to query on.
     */
    transform(items: any[], callback, query) {
        if (!items || !query) {
            return items;
        }

        return items.filter(item => {
            return callback(item, query);
        });
    }
}
