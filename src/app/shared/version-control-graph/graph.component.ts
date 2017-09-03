import { Component, ElementRef, Input, Output, QueryList, ContentChildren, ViewChild, AfterContentInit } from '@angular/core';

import { CommitComponent } from './commit.component';



@Component({
  selector: 'vcg-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  host: {}
})
export class GraphComponent implements AfterContentInit {
  @ContentChildren(CommitComponent) nodes: QueryList<CommitComponent>;
  @ViewChild('canvas') canvas: ElementRef;

  @Input()
  public nodeLineWidth: number = 2;

  @Input()
  public nodeRadius: number = 5.5;

  @Input()
  public nodeSpacingX: number = 4;

  @Input()
  public nodeSpacingY: number = 12;

  @Input()
  public edgeLineWidth: number = 1;

  public get context(): CanvasRenderingContext2D {
    if (this._context === undefined) {
      this._context = this.canvas.nativeElement.getContext('2d');
    }
    return this._context;
  }

  public height: number;
  public width: number;

  public get size(): [number, number] {
    return [this.width, this.height];
  }
  public set size(size: [number, number]) {
    if (this.canvas !== undefined) {
      let ratio: number = window.devicePixelRatio || 1;
      let canvasEl: any = this.canvas.nativeElement;

      canvasEl.width = size[0] * ratio;
      canvasEl.height = size[1] * ratio;

      this.context.scale(ratio, ratio); 
    }

    this.width = size[0];
    this.height = size[1];
  }

  public get nodeDiameter(): number {
    return 2 * this.nodeRadius;
  }

  public get commitHeight(): number {
    if (this._commitHeight === undefined) {
      this._commitHeight = this.nodeDiameter + this._commitHeightDifference;
    }
    return this._commitHeight;
  }

  public get commitPadding(): number {
    if (this._commitPadding === undefined) {
      this._commitPadding = 0.5 * (this.nodeSpacingY - this.nodeLineWidth);
    }
    return this._commitPadding;
  }

  private _stradleFactor: number = 0.5;
  private _commitHeightDifference: number = 2;

  private _context: CanvasRenderingContext2D;
  private _commitHeight: number;
  private _commitPadding: number; 

  public ngAfterContentInit() {
    this.redraw();
  }

  public redraw() {
    let nodes: CommitComponent[] = this.nodes.toArray();

    // set size of canvas scaled for device pixel density
    let maxDepthNode: CommitComponent = nodes.reduce(
      function(previousValue: CommitComponent, currentValue: CommitComponent) {
        return previousValue.depth > currentValue.depth ? previousValue : currentValue;
      }
    );
    let maxDepth: number = maxDepthNode.depth;
    let graphWidth: number = maxDepth * this.nodeDiameter + (maxDepth - 1) * this.nodeSpacingX + 2 * this._stradleFactor; 
    let graphHeight: number = nodes.length * this.nodeDiameter + (nodes.length) * this.nodeSpacingY + 2 * this._stradleFactor;
    this.size = [graphWidth, graphHeight];

    // apply stride factor to align pixels
    this.context.translate(this._stradleFactor, this._stradleFactor);

    // draw nodes and edges
    for (var i: number = 0; i < nodes.length; ++i) {
      let node: CommitComponent = nodes[i];
      let depth: number = node.depth;
      let x: number = this.nodeRadius + (depth - 1) * this.nodeDiameter + (depth - 1) * this.nodeSpacingX;
      let y: number = this.nodeRadius + i * this.nodeDiameter + (i + 0.5) * this.nodeSpacingY;

      node.height = this.commitHeight;
      node.padding = this.commitPadding;

      this.context.lineWidth = this.nodeLineWidth;
      this.context.beginPath();
      this.context.arc(
        x,
        y,
        this.nodeRadius - 0.5 * this.nodeLineWidth,
        0,
        2 * Math.PI
      );
      this.context.stroke();
      this.context.closePath();

      // don't draw edges if this is the first node
      if (i === 0) {
        continue;
      }

      // get the parent nodes for the node; if no parents exist use the
      // previous node in the list
      var parentNodes: CommitComponent[] = this._getParentNodes(node);
      if (parentNodes.length === 0) {
        parentNodes.push(nodes[i-1]);
      }

      // begin drawing edges
      this.context.lineWidth = this.edgeLineWidth;

      for (var j = 0; j < parentNodes.length; ++j) {
        let parentNode: CommitComponent = parentNodes[j];
        let parentIndex: number = nodes.indexOf(parentNode);
        let parentDepth: number = parentNode.depth;
        let parentX: number = this.nodeRadius + (parentDepth - 1) * this.nodeDiameter + (parentDepth - 1) * this.nodeSpacingX;
        let parentY: number = this.nodeRadius + parentIndex * this.nodeDiameter + (parentIndex + 0.5) * this.nodeSpacingY;

        this.context.beginPath();

        // branching from parentNode to node
        if (depth > parentDepth) {
          this.context.moveTo(
            parentX,
            parentY + this.nodeRadius
          );
          this.context.lineTo(
            x,
            parentY + this.nodeRadius + 0.5 * this.nodeSpacingY
          );
          this.context.lineTo(
            x,
            y - this.nodeRadius
          );
        }
        // merging parentNode to node
        else {
          this.context.moveTo(
            parentX,
            parentY + this.nodeRadius
          );
          this.context.lineTo(
            parentX,
            y - this.nodeRadius - 0.5 * this.nodeSpacingY
          );
          this.context.lineTo(
            x,
            y - this.nodeRadius
          );
        }

        this.context.stroke();
        this.context.closePath();
      }
    }
  }

  private _getParentNodes(node: CommitComponent): CommitComponent[] {
    var parentNodes: CommitComponent[] = [];
    let parentNodeNames: string[] = node.parentNodes;

    for (var j = 0; j < parentNodeNames.length; ++j) {
      let parentNodeName: string = parentNodeNames[j];
      let parentNode: CommitComponent = this.nodes.find(function(n) {
        return n.name === parentNodeName;
      });

      if (parentNode !== undefined) {
        parentNodes.push(parentNode);
      }
    }

    return parentNodes;
  }
}
