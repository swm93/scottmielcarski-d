import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'vcg-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css'],
  host: {
    '[style.font-size]': 'height',
    '[style.padding]': 'padding'
  }
})
export class CommitComponent {
  @Input()
  public name: string;

  @Input()
  public depth: number = 0;

  @Input()
  public parentNodes: string[] = [];

  @Input()
  public height: string;

  @Input()
  public padding: string;
}
