import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from '../itour';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'filterAuth'
})
export class FilterAuthPipe implements PipeTransform {

  transform(items: ITour[], authService: AuthService): ITour[] {
    if (!items) { return []; }

    return items.filter(it => {
      return authService.canShow(it);
    });

  }

}
