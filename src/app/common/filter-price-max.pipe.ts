import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterPriceMax',
  pure: false
})
export class FilterPriceMaxPipe implements PipeTransform {

  transform(items: ITour[], price: Number): ITour[] {
    if (!items) return [];
    if (!price) return items;

    return items.filter(it => {
      return it.price <= price;
    });
  }


}
