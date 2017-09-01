import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { GraphModule } from './shared/graph/graph.module';
import { SharedModule }  from './shared/shared.module';



@NgModule({
  imports:      [ BrowserModule, GraphModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
