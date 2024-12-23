import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperCaseInput]'
})
export class UpperCaseInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.toUpperCase();
  }

}
