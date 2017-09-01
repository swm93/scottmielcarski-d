import { Component, Input, Output, QueryList, ContentChildren, AfterContentInit } from '@angular/core';

import { NodeComponent } from './node/node.component';


@Component({
  selector: 'swm-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  host: {}
})
export class GraphComponent implements AfterContentInit {
@ContentChildren(NodeComponent) nodes : QueryList<NodeComponent>;

  @Input()
  public nodeLineWidth:number = 2;

  @Input()
  public nodeRadius:number = 5.5;

  @Input()
  public nodeSpacingX:number = 4;

  @Input()
  public nodeSpacingY:number = 12;

  @Input()
  public edgeLineWidth:number = 1;

  private _stradleFactor:number = 0;


  ngAfterContentInit() {
    this.redrawGraph();
  }

  redrawGraph() {
    var nodes = this.nodes.toArray();
    var maxDepth = nodes.reduce(
      function(max, node) {
        return max > node.depth ? max : node.depth;
      }
    );

    var graphWidth = maxDepth * 2 * this.nodeRadius + (maxDepth - 1) * this.nodeSpacingX + 2 * this._stradleFactor; 
    var graphHeight = nodes.length * 2 * this.nodeRadius + (nodes.length) * this.nodeSpacingY + 2 * this._stradleFactor;

    var graph = document.getElementById('graph-canvas');
    graph.width = graphWidth;
    graph.height = graphHeight;

    var ctx = graph.getContext('2d');
    ctx.translate(this._stradleFactor, this._stradleFactor);


    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = (
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1
    );
    var ratio = devicePixelRatio / backingStoreRatio;

    var oldWidth = graph.width;
    var oldHeight = graph.height;

    graph.width = oldWidth * ratio;
    graph.height = oldHeight * ratio;

    graph.style.width = oldWidth + 'px';
    graph.style.height = oldHeight + 'px';

    // now scale the context to counter
    // the fact that we've manually scaled
    // our canvas element
    ctx.scale(ratio, ratio);


    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      var depth = node.depth;
      var x = this.nodeRadius + (depth - 1) * 2 * this.nodeRadius + (depth - 1) * this.nodeSpacingX;
      var y = this.nodeRadius + i * 2 * this.nodeRadius + (i + 0.5) * this.nodeSpacingY;

      node.height = 2 * this.nodeRadius + 2 + "px";

      let nodeMargin: number = this.nodeSpacingY - this.nodeLineWidth - 2;
      if (i === 0) {
        node.margin = 0.5 * nodeMargin + "px 0px " + nodeMargin + "px 0px";
      }
      else if (i === nodes.length - 1) {
        node.margin = nodeMargin + "px 0px " + 0.5 * nodeMargin + "px 0px";
      }
      else {
        node.margin = nodeMargin + "px 0px";
      }

      ctx.lineWidth = this.nodeLineWidth;
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        this.nodeRadius - 0.5 * this.nodeLineWidth,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.closePath();

      if (i === 0) {
        continue;
      }

      var parentNodes:NodeComponent[] = [];
      var parentNodeNames:string[] = node.parentNodes;
      if (parentNodeNames.length === 0) {
        parentNodes.push(nodes[i-1]);
      }
      else {
        for (var j = 0; j < parentNodeNames.length; ++j) {
          let parentNodeName:string = parentNodeNames[j];
          let parentNode:NodeComponent = nodes.find(function(n) {
            return n.name === parentNodeName;
          });

          if (parentNode !== undefined) {
            parentNodes.push(parentNode);
          }
        }
      }

      ctx.lineWidth = this.edgeLineWidth;
      for (var j = 0; j < parentNodes.length; ++j) {
        var parentNode = parentNodes[j];
        var parentIndex = nodes.indexOf(parentNode);
        var parentDepth = parentNode.depth;
        var parentX = this.nodeRadius + (parentDepth - 1) * 2 * this.nodeRadius + (parentDepth - 1) * this.nodeSpacingX;
        var parentY = this.nodeRadius + parentIndex * 2 * this.nodeRadius + (parentIndex + 0.5) * this.nodeSpacingY;

        ctx.beginPath();

        if (depth > parentDepth) {
          ctx.moveTo(
            parentX,
            parentY + this.nodeRadius
          );
          ctx.lineTo(
            x,
            parentY + this.nodeRadius + 0.5 * this.nodeSpacingY
          );
          ctx.lineTo(
            x,
            y - this.nodeRadius
          );
        }
        else {
          ctx.moveTo(
            parentX,
            parentY + this.nodeRadius
          );
          ctx.lineTo(
            parentX,
            y - this.nodeRadius - 0.5 * this.nodeSpacingY
          );
          ctx.lineTo(
            x,
            y - this.nodeRadius
          );
        }

        ctx.stroke();
        ctx.closePath();
      }
  }
}
