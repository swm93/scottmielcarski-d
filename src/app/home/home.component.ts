import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';



@Component({
  selector: 'swm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {}
})
export class HomeComponent {
  @ViewChild('toggleTextButton') toggleTextButton: ElementRef;
  @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('detailContainer') detailContainer: ElementRef;
  @ViewChild('animationContainer') animationContainer: ElementRef;
  @ViewChildren('detailContent') detailContentEls: QueryList<ElementRef>;

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
      this.toggleText(value);
    }

    this._isTextShown = value;
  }

  private _isTextShown: boolean = true;


  private toggleText(value: boolean) {
    const els: ElementRef[] = this.detailContentEls.toArray();
    var sets: Map<string, ElementRef[]> = new Map<string, ElementRef[]>();

    for (let el of els) {
      let nameAttribute: string = el.nativeElement.getAttribute('name');

      if (!sets.has(nameAttribute)) {
        sets.set(nameAttribute, []);
      }

      var set: ElementRef[] = sets.get(nameAttribute);
      set.push(el);
    }

    let setIterator = sets.values();
    var setResult: IteratorResult<ElementRef[]> = setIterator.next();
    while (!setResult.done) {
      this.animateSet(setResult.value, !value);
      setResult = setIterator.next();
    }
  }

  private animateSet(els: ElementRef[], toDetail: boolean) {
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
    const fromTop: number = fromEl.nativeElement.offsetTop;
    const toTop: number = toEl.nativeElement.offsetTop;
    const fromLeft: number = fromEl.nativeElement.offsetLeft;
    const toLeft: number = toEl.nativeElement.offsetLeft;
    const fromHeight: number = fromEl.nativeElement.offsetHeight;
    const toHeight: number = toEl.nativeElement.offsetHeight;


    animEl.nativeElement.style.top = fromTop + 'px';
    if (animEl.nativeElement.textContent === "") {
      animEl.nativeElement.style.left = fromLeft + 'px';
    }
    else {
      animEl.nativeElement.style.textIndent = fromLeft + 'px';
      animEl.nativeElement.style.height = fromHeight + 'px';
    }
    animEl.nativeElement.style.display = 'block';

    fromEl.nativeElement.style.visibility = 'hidden';
    toEl.nativeElement.style.visibility = 'hidden';

    setTimeout(() => {
      animEl.nativeElement.style.top = toTop + 'px';
      if (animEl.nativeElement.textContent === "") {
        animEl.nativeElement.style.left = toLeft + 'px';
      }
      else {
        animEl.nativeElement.style.textIndent = toLeft + 'px';
        animEl.nativeElement.style.height = toHeight + 'px';
      }
    }, 0);

    animEl.nativeElement.addEventListener(
      "transitionend",
      () => {
        toEl.nativeElement.style.visibility = 'visible';
        animEl.nativeElement.style.display = 'none';
      },
      false
    );
  }
}
