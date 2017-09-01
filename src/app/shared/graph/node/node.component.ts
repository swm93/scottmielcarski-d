import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'swm-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
  host: {
    '[style.font-size]': 'height',
    '[style.margin]': 'margin'
  }
})
export class NodeComponent {
  @Input()
  public name: string;

  @Input()
  public depth: number = 0;

  @Input()
  public parentNodes: string[] = [];

  @Input()
  public height: string;

  @Input()
  public margin: string;
}
