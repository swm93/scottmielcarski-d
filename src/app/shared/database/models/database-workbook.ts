import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DatabaseSheet } from './database-sheet';



export class DatabaseWorkbook {
  public name: string;

  private _endpoint: string;
  private _key: string;

  private get _databaseUrl(): string {
    return this._endpoint + '/feeds/worksheets/' + this._key + '/public/basic?alt=json';
  }


  constructor(endpoint: string, key: string) {
    this._endpoint = endpoint;
    this._key = key;
  }

  public async fetch(http: Http): Promise<DatabaseSheet[]> {
    let sheets: DatabaseSheet[] = [];
    let response: Response = await http.get(this._databaseUrl).toPromise();
    const data: object = response.json();

    this.name = data.feed.title.$t;

    for (let entry: object of data.feed.entry) {
      const linkCount: number = entry.link.length;

      let sheet: DatabaseSheet = new DatabaseSheet(this._endpoint, this._key);
      sheet.id = entry.link[linkCount-1].href.split('/').pop();
      sheet.name = entry.title.$t;

      sheets.push(sheet);
    }

    return sheets;
  }
}
