import { Component, Input } from '@angular/core';



@Component({
  selector: 'swm-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.css']
})
export class NavbarLinkComponent {
  @Input()
  public link: any;

  public get isRouterLink(): boolean {
    let result: boolean = true;
    let url: string;

    if (this.link instanceof Array) {
      if (this.link.length > 0 && typeof this.link[0] === 'string') {
        url = this.link[0];
      }
    }
    else if (typeof this.link === 'string') {
      url = this.link;
    }

    if (url !== undefined) {
      result = url.match(/^(\/.*|\['\/.*'\])/) !== null;
    }

    return result;
  }
}
