import '../../core/calendar-style/calendar-style.scss'
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core'
import { CalendarProvider, IFormats } from './calendar-picker.provider'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'

enum DisplayMode {
  dayFromMonth,
  monthFromYear,
  yearFromDecade
}

// https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73#.csjhq6bvg

@Component({
  selector: 'fractal-calendar-picker',
  templateUrl: './calendar-picker.view.html',
  host: {'class': 'fractal-calendar-picker'}
})
export class CalendarPicker extends CalendarComponent {
  @Input() pageLength = 1
  @Output() selectDateEmitter = new EventEmitter<Date>();

  constructor(public provider:CalendarProvider) {
    super(provider)
  }
  ngOnInit() {
    this.onInit()
    this.selectDateEmitter.emit(this.selectedDate)
  }
  onSelectDateOfMonth(date:Date){
    this.selectDateOfMonth(date)
    this.selectDateEmitter.emit(this.selectedDate)
  }
  onGotoToday(){
    this.gotoToday()
    this.selectDateEmitter.emit(this.selectedDate)
  }
}