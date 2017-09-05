import { Component} from '@angular/core';
import { Http } from '@angular/http';

import { CardModule } from '../shared/card/card.module';

import { Photo } from './models/photo';



@Component({
  selector: 'swm-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css'],
  host: {}
})
export class PhotographyComponent {
  public photos: Photo[] = [];

  private _key: string = "1fUnJ5m4d1cwbz3aNCBW1mlx72bNS8bCtoUd5-rih7V8";


  constructor(http: Http) {
    const databaseUrl: string = 'https://spreadsheets.google.com/feeds/worksheets/' + this._key + '/public/basic?alt=json';

    http.get(databaseUrl)
      .subscribe(
        (response: Response) => {
          const data: object = response.json();
          const name: string = data.feed.title.$t;

          for (let i: number = 0; i < data.feed.entry.length; ++i) {
            const entry: object = data.feed.entry[i];

            if (entry.content.$t === 'photo') {
              const linkCount: number = entry.link.length;
              const sheetId: string = entry.link[linkCount-1].href.split('/').pop();

              this._loadSheet(http, sheetId);
            }
          }
        },
        (error: string) => {
          console.log(error);
        }
      );
  }

  private _loadSheet(http: Http, sheetId: string) {
    const sheetUrl: string = 'https://spreadsheets.google.com/feeds/list/' + this._key + '/' + sheetId + '/public/values?alt=json';

    http.get(sheetUrl)
      .subscribe(
        (response: Response) => {
          const data: object = response.json();

          for (let i: number = 0; i < data.feed.entry.length; ++i) {
            const entry: object = data.feed.entry[i];
            let photo: Photo = new Photo();
            photo.name = entry.gsx$name.$t;
            photo.url = entry.gsx$url.$t;
            photo.urlFallback = entry.gsx$urlfallback.$t;
            photo.takenAt = new Date(entry.gsx$takenat.$t);

            this.photos.push(photo);
          }
        },
        (error: string) => {
          console.log(error);
        }
      );
  }
}
