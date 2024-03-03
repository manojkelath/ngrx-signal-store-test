import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  public transform(items: any[], filterString: string, property: string) {
    if (!items || !filterString) {
      return items;
    }

    return items.filter((item) => item[property].toLowerCase().indexOf(filterString.toLowerCase()) !== -1);
  }
}
