import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavigationBarModule } from './shared/navigation-bar/navigation-bar.module';
import { VersionControlGraphModule } from './shared/version-control-graph/version-control-graph.module';



@NgModule({
  imports:      [ routing, BrowserModule, NavigationBarModule, VersionControlGraphModule ],
  declarations: [ AppComponent, HomeComponent, ProjectsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
