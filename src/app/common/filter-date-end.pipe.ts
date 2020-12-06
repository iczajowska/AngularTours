import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterDateEnd',
  pure: false
})
export class FilterDateEndPipe implements PipeTransform {

  transform(items: ITour[], value: number): ITour[] {
    if (!items) return [];

    return items.filter(it => {
      return it.dateStart <= new Date(value);
    });
  }

}
