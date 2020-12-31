import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterDateStart',
  pure: false
})
export class FilterDateStartPipe implements PipeTransform {

  transform(items: ITour[], value: number): ITour[] {
    if (!items) return [];
    if (value === 0) return items;

    return items.filter(it => {
      return it.dateStart >= new Date(value);
    });
  }

}
