import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterRateMin',
  pure: false
})
export class FilterRateMinPipe implements PipeTransform {

  transform(items: ITour[], rate: Number): ITour[] {
    if (!items) { return []; }
    if (!rate) { return items; }

    return items.filter(it => {
      return it.rating >= rate;
    });
  }

}
