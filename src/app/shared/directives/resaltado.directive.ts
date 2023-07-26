import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input()
  appResaltado = 'brown';

  constructor(private elementRef : ElementRef, private renderer2 : Renderer2 ) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', this.appResaltado);
  }
}
