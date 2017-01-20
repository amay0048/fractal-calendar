import '../../core/calendar-style/calendar-style.scss'
import { Component, Inject, Input } from '@angular/core'
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

  constructor(public provider:CalendarProvider) {
    super(provider)
  }
  ngOnInit() {
    this.onInit()
  }
}