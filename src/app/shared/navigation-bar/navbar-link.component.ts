import { Component, Input } from '@angular/core';



@Component({
  selector: 'swm-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.css'],
  host: {}
})
export class NavbarLinkComponent{
  @Input()
  public href: string = "";
}
