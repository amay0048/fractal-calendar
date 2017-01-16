import '../../core/calendar-style/calendar-style.scss'
import { toCamelCase } from '../app/utils'
import { CalendarProvider } from './calendar-picker.provider'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'
import { ICalendarService } from '../../core/calendar-service/calendar-service'

class CalendarPickerController extends CalendarComponent implements ng.IComponentController {
  constructor(public $element: ng.IRootElementService, public provider: ICalendarService){
    super(provider)
    // Need this class to allow support of react
    $element.addClass('fractal-calendar-picker')
  }
  $onInit() {
    this.onInit()
  }
}
// This needs to be external to the class declaration
// If it was internal, the attribute would not be available
// until after the constructor was called
CalendarPickerController.$inject = ['$element', CalendarProvider.name]

export class CalendarPickerComponent implements ng.IComponentOptions {
  template = require('./calendar-picker.view.html')
  controller = CalendarPickerController
  controllerAs = 'vm'
  bindings = {
    pageLength: '<'
  }
}
// this property exists via modification of global Function interface
CalendarPickerComponent.componentSelector = toCamelCase('fractal-calendar-picker')