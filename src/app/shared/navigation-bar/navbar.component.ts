import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';



@Component({
  selector: 'swm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '[class.open]': 'isOpen'
  }
})
export class NavbarComponent {
  @ViewChild('expandButton')
  private _expandButton: ElementRef;
  public isOpen: boolean = false;


  @HostListener('window:click', ['$event'])
  public onClick(event) {
    if (event.target !== this._expandButton.nativeElement) {
      this.isOpen = false;
    }
  }
}
