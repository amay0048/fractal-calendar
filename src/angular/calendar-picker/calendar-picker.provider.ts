import { CalendarService as Service, IFormats } from '../../core/calendar-service/calendar-service'
export { IFormats }

export class CalendarProviderService extends Service { }

export class CalendarProvider implements ng.IServiceProvider {
    $get() {
        return new CalendarProviderService()
    }
}