import { Component } from '@angular/core';

import { PdfViewerComponent } from 'ng2-pdf-viewer';


@Component({
  selector: 'swm-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  host: {}
})
export class ResumeComponent {
  public isResumeLoaded: boolean = false;


  resumeLoaded(pdf: PDFDocumentProxy) {
    // give pdf time to render before showing
    setTimeout(() => {
      this.isResumeLoaded = true;
     }, 500);
  }
}
