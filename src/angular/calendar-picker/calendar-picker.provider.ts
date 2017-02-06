import { CalendarService as CalendarProviderService, IFormats } from '../../core/calendar-service/calendar-service'
export { IFormats, CalendarProviderService }

export class CalendarProvider implements ng.IServiceProvider {
    $get() {
        return new CalendarProviderService()
    }
}