import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[openDropdown]',
  exportAs: 'openDropdown'
})
export class DropdownDirective {

  @HostBinding('class.show') open: boolean = false
  

  @HostListener('click') openDrop(){
    this.open = !this.open;
    let element = this.el.nativeElement.querySelector('.dropdown-menu')
    if(this.open)
      this.renderer.addClass(element, 'show')
    else
      this.renderer.removeClass(element, 'show')
  }

  constructor(private el:ElementRef, private renderer:Renderer2) { }

}
