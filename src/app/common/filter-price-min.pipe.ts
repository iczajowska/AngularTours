import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterPriceMin',
  pure: false
})
export class FilterPriceMinPipe implements PipeTransform {

  transform(items: ITour[], price: Number): ITour[] {
    if (!items) { return []; }
    if (!price) { return items; }

    return items.filter(it => {
      return it.price >= price;
    });
  }
}
