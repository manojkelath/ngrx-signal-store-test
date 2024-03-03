import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'objectEntries',
})
export class ObjectEntriesPipe implements PipeTransform {
  public transform(value: Record<string, any>): [string, any][] {
    return Object.entries(value);
  }
}
