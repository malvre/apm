import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], term: string, field: string): any[] {
    if (!items) return [];
    if (!term) return items;

    term = term.toLowerCase();

    return items.filter((item) => {
      return item[field].toLowerCase().includes(term);
    });
  }
}
