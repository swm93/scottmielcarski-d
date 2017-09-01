import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NavigationBarModule } from './shared/navigation-bar/navigation-bar.module';
import { VersionControlGraphModule } from './shared/version-control-graph/version-control-graph.module';



@NgModule({
  imports:      [ BrowserModule, NavigationBarModule, VersionControlGraphModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
