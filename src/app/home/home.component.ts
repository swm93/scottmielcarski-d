import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';



@Component({
  selector: 'swm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {}
})
export class HomeComponent {
  @ViewChild('toggleTextButton') toggleTextButton: ElementRef;
  @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('detailContainer') detailContainer: ElementRef;
  @ViewChild('animationContainer') animationContainer: ElementRef;
  @ViewChildren('name') nameEls: QueryList<ElementRef>;
  @ViewChildren('age') ageEls: QueryList<ElementRef>;
  @ViewChildren('location') locationEls: QueryList<ElementRef>;

  public birthDate: string = "July 21, 1993";

  public get isTextShown(): boolean {
    return this._isTextShown;
  }
  public set isTextShown(value: boolean) {
    if (value !== this._isTextShown) {
      if (value) {
        this.showText();
      }
      else {
        this.hideText();
      }
    }

    this._isTextShown = value;
  }

  private _isTextShown: boolean = true;


  private showText() {
    this.animateSet(this.nameEls, false);
    this.animateSet(this.ageEls, false);
    this.animateSet(this.locationEls, false);

    this.toggleTextButton.nativeElement.style.top = 0;
  }

  private hideText() {
    this.animateSet(this.nameEls, true);
    this.animateSet(this.ageEls, true);
    this.animateSet(this.locationEls, true);

    this.toggleTextButton.nativeElement.style.top = this.detailContainer.nativeElement.offsetTop - 15 + 'px';
  }

  private animateSet(elSet: QueryList<ElementRef>, toDetail: boolean) {
    const els: ElementRef[] = elSet.toArray();

    if (els.length >= 3) {
      let animEl: ElementRef;
      let fromEl: ElementRef;
      let toEl: ElementRef;

      for (let el of els) {
        if (this.animationContainer.nativeElement.contains(el.nativeElement)) {
          animEl = el;
        }
        else if (this.detailContainer.nativeElement.contains(el.nativeElement)) {
          if (toDetail) {
            toEl = el;
          }
          else {
            fromEl = el;
          }
        }
        else if (this.textContainer.nativeElement.contains(el.nativeElement)) {
          if (toDetail) {
            fromEl = el;
          }
          else {
            toEl = el;
          }
        }
      }

      if (animEl && fromEl && toEl) {
        this.animate(animEl, fromEl, toEl);
      }
    }
  }

  private animate(animEl: ElementRef, fromEl: ElementRef, toEl: ElementRef) {
    animEl.nativeElement.style.top = fromEl.nativeElement.offsetTop + 'px';
    animEl.nativeElement.style.left = fromEl.nativeElement.offsetLeft + 'px';
    animEl.nativeElement.style.display = 'block';

    fromEl.nativeElement.style.visibility = 'hidden';

    setTimeout(() => {
      animEl.nativeElement.style.top = toEl.nativeElement.offsetTop + 'px';
      animEl.nativeElement.style.left = toEl.nativeElement.offsetLeft + 'px';
    }, 0);

    setTimeout(() => {
      toEl.nativeElement.style.visibility = 'visible';
      animEl.nativeElement.style.display = 'none';
    }, 500);
  }
}
