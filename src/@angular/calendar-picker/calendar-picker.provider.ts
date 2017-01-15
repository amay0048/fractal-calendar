import { Injectable } from '@angular/core'
import { CalendarService as Service, IFormats } from '../../core/calendar-service/calendar-service'
export { IFormats }

@Injectable()
export class CalendarProvider extends Service {
    getMonthsOfYear():any[][] {
        return [
            this.getMonthsByQuarter(1),
            this.getMonthsByQuarter(2),
            this.getMonthsByQuarter(3),
            this.getMonthsByQuarter(4)
        ]
    }
}