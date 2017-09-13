import { Pipe, PipeTransform } from '@angular/core';



@Pipe({name: 'expandNumber'})
export class ExpandNumber implements PipeTransform {
  private _lowNumbers: string[] = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '
  ];
  private _decades: string[] = [
    '',
    '',
    'twenty',
    'thirty',
    'fourty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];

  transform(value: string): string {
    let result: string = "";

    if (value.length > 9) {
      console.warn("expandNumber: value is too long");
      return;
    }

    let n: RegExpMatchArray = ('000000000' + value)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

    if (!n) {
      console.warn("expandNumber: failed to parse value");
      return;
    }

    result += (Number(n[1]) != 0) ? (this._lowNumbers[Number(n[1])] || this._decades[n[1][0]] + ' ' + this._lowNumbers[n[1][1]]) + 'crore' : '';
    result += (Number(n[2]) != 0) ? (this._lowNumbers[Number(n[2])] || this._decades[n[2][0]] + ' ' + this._lowNumbers[n[2][1]]) + 'lakh ' : '';
    result += (Number(n[3]) != 0) ? (this._lowNumbers[Number(n[3])] || this._decades[n[3][0]] + ' ' + this._lowNumbers[n[3][1]]) + 'thousand ' : '';
    result += (Number(n[4]) != 0) ? (this._lowNumbers[Number(n[4])] || this._decades[n[4][0]] + ' ' + this._lowNumbers[n[4][1]]) + 'hundred ' : '';
    result += (Number(n[5]) != 0) ? ((result != '') ? 'and ' : '') + (this._lowNumbers[Number(n[5])] || this._decades[n[5][0]] + ' ' + this._lowNumbers[n[5][1]]) : '';
    return result;
  }
}
