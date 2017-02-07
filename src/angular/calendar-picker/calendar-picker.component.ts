import '../../core/calendar-style/calendar-style.scss'
import { toCamelCase } from '../app/utils'
import { CalendarProviderService } from './calendar-picker.provider'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'
import { ICalendarService } from '../../core/calendar-service/calendar-service'
import { CalendarProvider } from './calendar-picker.provider'

class CalendarPickerController extends CalendarComponent implements ng.IComponentController {
  constructor(public provider: ICalendarService, $element: any){
    super(provider)
    // Add the class to the host so we can support the core css
    $element.addClass('fractal-calendar-picker')
  }
  $onInit() {
    this.onInit()
  }
}
// This needs to be external to the class declaration
// If it was internal, the attribute would not be available
// until after the constructor was called
CalendarPickerController.$inject = [CalendarProvider.name, '$element']

export class CalendarPickerComponent implements ng.IComponentOptions {
  template = require('./calendar-picker.view.html')
  controller = CalendarPickerController
  controllerAs = 'vm'
  bindings = {
    pageLength: '<',
    // optional 2 way binding for date
    selectedDate: '=?'
  }
}
// this property exists via modification of global Function interface
// toCamelCase helps me find the compontns using the html syntax
CalendarPickerComponent.componentSelector = toCamelCase('fractal-calendar-picker')