import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterRateMax',
  pure: false
})
export class FilterRateMaxPipe implements PipeTransform {

  transform(items: ITour[], rate: Number): ITour[] {
    if (!items) return [];
    if (!rate) return items;

    return items.filter(it => {
      return it.rating <= rate;
    });
  }

}
