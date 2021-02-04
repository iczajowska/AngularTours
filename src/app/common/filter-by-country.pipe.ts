import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterByCountry',
  pure: false
})
export class FilterByCountryPipe implements PipeTransform {

  transform(items: ITour[], country: string): ITour[] {
    if (!items) { return []; }

    if (!country) { return items; }

    return items.filter(it => {
      return it.country.toLowerCase().includes(country.toLowerCase());
    });
  }
}
