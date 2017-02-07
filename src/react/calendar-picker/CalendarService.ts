import { CalendarService } from '../../core/calendar-service/calendar-service'

// This is an application singleton, so I'm managing 
// the instantiation of this separately
export const calendarService = new CalendarService()