import { Pipe, PipeTransform } from '@angular/core';



@Pipe({name: 'yearDiff'})
export class YearDiff implements PipeTransform {
  transform(value: string): string {
    let result: string = "";
    const date: number = Date.parse(value);

    if (!isNaN(date)) {
      let diff: number = Date.now() - date;
      let diffDate: Date = new Date(diff);
      result = Math.abs(diffDate.getUTCFullYear() - 1970).toString();
    }

    return result;
  }
}
