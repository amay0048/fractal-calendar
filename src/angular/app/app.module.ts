import { AppComponent } from './app.component'
import { CalendarPickerComponent } from '../calendar-picker/calendar-picker.component'
import { CalendarProvider } from '../calendar-picker/calendar-picker.provider'
import { module } from 'angular'

declare global {
  interface Function {
    componentSelector?:string
  }
}

export const app = module('fractal',  [
    // require('angular-ui-router'),
    // require('angular-animate'),
    // require('angular-translate')
])

app
.component(AppComponent.componentSelector, new AppComponent())
.provider(CalendarProvider.name, CalendarProvider)
.component(CalendarPickerComponent.componentSelector, new CalendarPickerComponent())