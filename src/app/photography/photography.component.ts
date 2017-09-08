import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { CardModule } from '../shared/card/card.module';

import { Photo } from './models/photo';
import { PhotoService } from './models/photo-service';



@Component({
  selector: 'swm-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css'],
  host: {},
  providers: [PhotoService]
})
export class PhotographyComponent implements OnInit {
  public photos: Photo[] = [];
  public activePhoto: Photo = null;

  private _photoService: PhotoService;



  constructor(photoService: PhotoService) {
    this._photoService = photoService;
  }

  public async ngOnInit() {
    this.photos = await this._photoService.getAll();
  }
}
