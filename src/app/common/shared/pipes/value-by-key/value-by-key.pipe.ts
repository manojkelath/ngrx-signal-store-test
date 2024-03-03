import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueByKey',
  standalone: true,
})
export class ValueByKeyPipe implements PipeTransform {
  public transform(value: any, options: any) {
    if (options?.length && value) {
      return options?.find((item) => item.key === value)?.value;
    } else return '-';
  }
}
