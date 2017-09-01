import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GraphComponent } from './graph.component';
import { NodeComponent } from './node/node.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GraphComponent, NodeComponent],
  exports: [GraphComponent, NodeComponent]
})
export class GraphModule { }
