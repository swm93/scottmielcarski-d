import { Component, Input } from '@angular/core';



@Component({
  selector: 'swm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {}
})
export class NavbarComponent{
  @Input()
  public title: string = "";
}
