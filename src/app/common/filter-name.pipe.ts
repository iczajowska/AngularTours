import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';

@Pipe({
  name: 'filterName',
  pure: false
})
export class FilterNamePipe implements PipeTransform {

  transform(items: ITour[], searchText: string): ITour[] {
    if(!items) return [];

    if(searchText === "") return items;
    // searchText.toLowerCase();

    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText.toLowerCase()) || 
      it.destination.toLowerCase().includes(searchText.toLowerCase()) ||
      it.description.toLowerCase().includes(searchText.toLowerCase()) ||
      it.country.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
