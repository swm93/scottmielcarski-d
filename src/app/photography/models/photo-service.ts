import { Injectable } from '@angular/core';

import { DatabaseService } from '/app/shared/database/database-service';
import { Photo } from './photo';



@Injectable()
export class PhotoService {
  private _database: DatabaseService;
  private _photos: Photo[];


  constructor(database: DatabaseService) {
    this._database = database;
  }

  public async getAll(): Promise<Photo[]> {
    if (this._photos === undefined) {
      let photos: Photo[] = [];
      let data: object[] = await this._database.fetch('photo');

      for (let obj: object of data) {
        let photo: Photo = new Photo();

        photo.name = obj.name;
        photo.url = obj.url;
        photo.urlFallback = obj.urlfallback;
        photo.takenAt = new Date(obj.takenat);

        photos.push(photo);
      }

      this._photos = photos;
    }

    return this._photos;
  }
}
