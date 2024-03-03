import { Pipe, PipeTransform } from '@angular/core';
import RisNil from 'ramda/es/isNil';

@Pipe({
  name: 'isNotNil',
})
export class IsNotNilPipe implements PipeTransform {
  public transform(value: any): boolean {
    return !RisNil(value);
  }
}
