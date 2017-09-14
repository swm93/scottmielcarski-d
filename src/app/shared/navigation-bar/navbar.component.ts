import { Component } from '@angular/core';



@Component({
  selector: 'swm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '[class.open]': 'isOpen'
  }
})
export class NavbarComponent {
  public isOpen: boolean = false;
}
