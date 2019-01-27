import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.author.toLowerCase().includes(searchText) 
      ||it.name.toLowerCase().includes(searchText)
      ||it.category.toLowerCase().includes(searchText);
    });
   }
}