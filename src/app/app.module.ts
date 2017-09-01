import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { VersionControlGraphModule } from './shared/version_control_graph/version_control_graph.module';



@NgModule({
  imports:      [ BrowserModule, VersionControlGraphModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
