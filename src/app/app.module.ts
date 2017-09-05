import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { DevelopmentComponent } from './development/development.component';
import { PhotographyComponent } from './photography/photography.component';
import { ResumeComponent } from './resume/resume.component';
import { CardModule } from './shared/card/card.module';
import { NavigationBarModule } from './shared/navigation-bar/navigation-bar.module';
import { VersionControlGraphModule } from './shared/version-control-graph/version-control-graph.module';



@NgModule({
  imports:      [ routing, BrowserModule, HttpModule, CardModule, NavigationBarModule, VersionControlGraphModule ],
  declarations: [ AppComponent, HomeComponent, DevelopmentComponent, PhotographyComponent, ResumeComponent, PdfViewerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
