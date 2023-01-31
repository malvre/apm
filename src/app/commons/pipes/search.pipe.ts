import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items) return [];
    if (!term) return items;

    term = term.toLowerCase();

    return items.filter((item) => {
      return Object.values(item).join(' ').toLowerCase().includes(term);
    });
  }
}
