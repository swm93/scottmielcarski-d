import { Component, Input } from '@angular/core';



@Component({
  selector: 'swm-card-header',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card-header.component.css'],
  host: {
    '[style.background-image]': 'background'
  }
})
export class CardHeaderComponent {
  @Input()
  public get background() : string {
    return this._background;
  }
  public set background(background: string) {
    if (background.startsWith('#')) {
      this._background = background;
    }
    else {
      this._background = "url(" + background + ")";
    }
  }

  private _background: string;
}
