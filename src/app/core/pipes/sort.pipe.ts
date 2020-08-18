import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false
})
export class SortPipe implements PipeTransform {

    /**
     * Sorts an array of objects based on an attribute (value), a callback comparison function and whether it needs
     * to be in reverse order.
     *
     * @param items         The array of objects to sort.
     * @param value         The attribute to sort on for each object.
     * @param callback      The callback function to sort with.
     * @param reverse       Whether it needs to be reversely sorted or not.
     */
    transform(items: any[], value, callback: (a: any, b: any) => number, reverse: boolean): unknown {
        if (!items || !callback) {
            return items;
        }

        items.sort((a: any, b: any) => {
            return callback(this.getNestedObject(a, value), this.getNestedObject(b, value));
        });

        if (reverse) {
            return items.reverse();
        }

        return items;
    }

    getNestedObject(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        const a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    /**
     * Callback function for lexicographical (alphabetical) sort.
     * @param valueA    First string to compare.
     * @param valueB    Second string to compare.
     */
    public lexicographicSort(valueA, valueB): number {
        return valueA.localeCompare(valueB);
    }

    /**
     * Callback function for boolean sort.
     * @param valueA    First boolean to compare.
     * @param valueB    Second boolean to compare.
     */
    public booleanSort(valueA, valueB): number {
        if (valueA === valueB) {
            return 0;
        } else if (valueA && !valueB) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Callback function for date sort.
     * @param valueA    First date to compare.
     * @param valueB    Second date to compare.
     */
    public dateSort(valueA, valueB): number {
        if (valueA.getTime() === valueB.getTime()) {
            return 0;
        } else if (valueA.getTime() >= valueB.getTime()) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Callback function for number sort.
     * @param valueA    First number to compare.
     * @param valueB    Second number to compare.
     */
    public numberSort(valueA, valueB): number {
        if (valueA === valueB) {
            return 0;
        } else if (valueA > valueB) {
            return 1;
        } else {
            return -1;
        }
    }
}
