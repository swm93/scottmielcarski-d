import { Component } from '@angular/core';



@Component({
  selector: 'swm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentDate: Date = new Date();
}
