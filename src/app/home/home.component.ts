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

  public get height(): number {
    let result: number;

    if (this.isTextShown) {
      result = this.textContainer.nativeElement.offsetHeight;
    }
    else {
      result = this.detailContainer.nativeElement.offsetHeight;
    }

    return result;
  }
  public set height(value: number) {}

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
  }

  private hideText() {
    this.animateSet(this.nameEls, true);
    this.animateSet(this.ageEls, true);
    this.animateSet(this.locationEls, true);
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
    const fromTop: number = fromEl.nativeElement.offsetTop + fromEl.nativeElement.offsetParent.offsetTop;
    const toTop: number = toEl.nativeElement.offsetTop + toEl.nativeElement.offsetParent.offsetTop;
    const fromLeft: number = fromEl.nativeElement.offsetLeft + fromEl.nativeElement.offsetParent.offsetLeft;
    const toLeft: number = toEl.nativeElement.offsetLeft + toEl.nativeElement.offsetParent.offsetLeft;

    animEl.nativeElement.style.top = fromTop + 'px';
    animEl.nativeElement.style.left = fromLeft + 'px';
    animEl.nativeElement.style.display = 'block';

    fromEl.nativeElement.style.visibility = 'hidden';

    setTimeout(() => {
      animEl.nativeElement.style.top = toTop + 'px';
      animEl.nativeElement.style.left = toLeft + 'px';
    }, 0);

    setTimeout(() => {
      toEl.nativeElement.style.visibility = 'visible';
      animEl.nativeElement.style.display = 'none';
    }, 500);
  }
}
