import { Component, ElementRef, Input, Output, QueryList, ContentChildren, ViewChild, AfterContentInit } from '@angular/core';

import { CommitComponent } from './commit.component';



@Component({
  selector: 'vcg-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  host: {}
})
export class GraphComponent implements AfterContentInit {
  @ContentChildren(CommitComponent) nodes : QueryList<CommitComponent>;
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('alignmentP') alignmentP:ElementRef;

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

  public get nodeDiameter(): number {
    return 2 * this.nodeRadius;
  }

  public get commitHeight(): number {
    if (this._commitHeight === undefined) {
      this._commitHeight = this.nodeDiameter + this._commitHeightDifference;
    }
    return this._commitHeight;
  }

  public get commitMargin(): number {
    if (this._commitMargin === undefined) {
      this._commitMargin = this.nodeSpacingY - this.nodeLineWidth - this._commitHeightDifference;
    }
    return this._commitMargin;
  }

  private const _stradleFactor: number = 0.5;
  private const _commitHeightDifference: number = 2;

  private _context: CanvasRenderingContext2D;
  private _commitHeight: number;
  private _commitMargin: number;


  public ngAfterContentInit() {
    this.redraw();
  }

  public redraw() {
    let nodes: CommitComponent[] = this.nodes.toArray();

    // set size of canvas scaled for device pixel density
    let maxDepth: number = nodes.reduce(
      function(max, node) {
        return max > node.depth ? max : node.depth;
      }
    );
    let graphWidth: number = maxDepth * this.nodeDiameter + (maxDepth - 1) * this.nodeSpacingX + 2 * this._stradleFactor; 
    let graphHeight: number = nodes.length * this.nodeDiameter + (nodes.length) * this.nodeSpacingY + 2 * this._stradleFactor;
    this._updateSize(graphWidth, graphHeight);

    // apply stride factor to align pixels
    this.context.translate(this._stradleFactor, this._stradleFactor);

    // draw nodes and edges
    for (var i: number = 0; i < nodes.length; ++i) {
      let node: CommitComponent = nodes[i];
      let depth: number = node.depth;
      let x: number = this.nodeRadius + (depth - 1) * this.nodeDiameter + (depth - 1) * this.nodeSpacingX;
      let y: number = this.nodeRadius + i * this.nodeDiameter + (i + 0.5) * this.nodeSpacingY;

      node.height = this.commitHeight + "px";

      if (i === 0) {
        node.margin = 0.5 * this.commitMargin + "px 0px " + this.commitMargin + "px 0px";
      }
      else if (i === nodes.length - 1) {
        node.margin = this.commitMargin + "px 0px " + 0.5 * this.commitMargin + "px 0px";
      }
      else {
        node.margin = this.commitMargin + "px 0px";
      }

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

  private _updateSize(width: number, height: number) {
    let devicePixelRatio: number = window.devicePixelRatio || 1;
    let backingStoreRatio: number = (
      this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio ||
      1
    );
    let ratio: number = devicePixelRatio / backingStoreRatio;
    let canvasEl: Element = this.canvas.nativeElement;
    let alignmentPEl: Element = this.alignmentP.nativeElement;

    canvasEl.width = width * ratio;
    canvasEl.height = height * ratio;

    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';

    alignmentPEl.style.width = width + 'px';
    alignmentPEl.style.height = height + 'px';

    this.context.scale(ratio, ratio); 
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
