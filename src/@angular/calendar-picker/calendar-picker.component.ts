import '../../core/calendar-style/calendar-style.scss'
import { Component, Inject, Input, ElementRef } from '@angular/core'
import { CalendarProvider, IFormats } from './calendar-picker.provider'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'

enum DisplayMode {
  dayFromMonth,
  monthFromYear,
  yearFromDecade
}

@Component({
  selector: 'fractal-calendar-picker',
  templateUrl: './calendar-picker.view.html'
})
export class CalendarPicker extends CalendarComponent {
  @Input() pageLength = 1

  constructor(public provider:CalendarProvider, public element: ElementRef) {
    super(provider)
  }
  ngOnInit() {
    this.onInit()
    let el = this.element.nativeElement
    el.className = (el.className + ' fractal-calendar-picker').trim()
  }
}