import { Injectable } from '@angular/core'
import { CalendarService as Service, IFormats } from '../../core/calendar-service/calendar-service'
export { IFormats }

@Injectable()
export class CalendarProvider extends Service { }