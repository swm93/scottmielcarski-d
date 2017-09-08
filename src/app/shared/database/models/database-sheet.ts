import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';



export class DatabaseSheet {
  public id: string;
  public name: string;

  private _endpoint: string;
  private _key: string;

  private get _sheetUrl(): string {
    let url: string;

    if (this.id !== undefined) {
      url = this._endpoint + '/feeds/list/' + this._key + '/' + this.id + '/public/values?alt=json';
    }

    return url;
  }


  constructor(endpoint: string, key: string) {
    this._endpoint = endpoint;
    this._key = key;
  }

  public async fetch(http: Http): Promise<any[]> {
    let objects: any[] = [];
    let response: Response = await http.get(this._sheetUrl).toPromise();
    const data: any = response.json();

    for (let entry of data.feed.entry) {
      let obj: any = {};

      for (let key in entry) {
        let match: any = key.match(/^gsx\$(\w+)$/);

        if (match !== null && match.length > 1) {
          obj[match[1]] = entry[key].$t;
        }
      }

      objects.push(obj);
    }

    return objects;
  }
}
