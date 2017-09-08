import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DatabaseWorkbook } from './models/database-workbook';
import { DatabaseSheet } from './models/database-sheet';



@Injectable()
export class DatabaseService {
  private _endpoint: string = "https://spreadsheets.google.com";
  private _key: string = "1fUnJ5m4d1cwbz3aNCBW1mlx72bNS8bCtoUd5-rih7V8";

  private _http: Http;

  private _workbook: DatabaseWorkbook;
  private _sheets: DatabaseSheet[];

  private _sheetDataCache: Map<string, any[]> = new Map<string, any[]>();



  constructor(http: Http) {
    this._workbook = new DatabaseWorkbook(
      this._endpoint,
      this._key
    );
    this._http = http;
  }

  public async fetch(tableName: string): Promise<any[]> {
    if (!this._sheetDataCache.has(tableName)) {
      if (this._sheets === undefined) {
        this._sheets = await this._workbook.fetch(this._http);
      }

      for (let sheet of this._sheets) {
        if (sheet.name === tableName) {
          let data: any[] = await sheet.fetch(this._http);

          this._sheetDataCache.set(tableName, data);
          break;
        }
      }
    }

    return this._sheetDataCache.get(tableName);
  }
}
