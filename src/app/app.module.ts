import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { CardModule } from './shared/card/card.module';
import { NavigationBarModule } from './shared/navigation-bar/navigation-bar.module';
import { VersionControlGraphModule } from './shared/version-control-graph/version-control-graph.module';



@NgModule({
  imports:      [ routing, BrowserModule, CardModule, NavigationBarModule, VersionControlGraphModule ],
  declarations: [ AppComponent, HomeComponent, ProjectsComponent, ResumeComponent, PdfViewerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
