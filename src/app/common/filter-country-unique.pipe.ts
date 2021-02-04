import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterCountryUnique',
  pure: false
})
export class FilterCountryUniquePipe implements PipeTransform {

  transform(items: ITour[], args?: any): String[] {
    if (!items) { return []; }

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    return items.map(t => t.country).filter(unique);
  }

}
