import { CalendarService as Service, IFormats } from '../../core/calendar-service/calendar-service'
export { IFormats }

export class CalendarProviderService extends Service { 
    getMonthsOfYear():any[][] {
        return [
            this.getMonthsByQuarter(1),
            this.getMonthsByQuarter(2),
            this.getMonthsByQuarter(3),
            this.getMonthsByQuarter(4)
        ]
    }
}

export class CalendarProvider implements ng.IServiceProvider {
    $get() {
        return new CalendarProviderService()
    }
}