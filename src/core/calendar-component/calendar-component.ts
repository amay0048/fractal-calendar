import { ICalendarService, IFormats } from '../calendar-service/calendar-service'

enum DisplayMode {
  dayFromMonth,
  monthFromYear,
  yearFromDecade
}

export class CalendarComponent {
  protected daysOfMonths: Date[][][]
  protected monthsOfYear: any[][]
  protected isVisible = true
  protected args: any[]
  protected todaysDate: Date
  protected selectedDate: Date
  protected modes = DisplayMode
  protected displayMode = this.modes.dayFromMonth

  protected FORMATS: IFormats
  // public provider: ICalendarService

  pageLength = 1
  constructor(public provider:ICalendarService) {
    // In react world, this isn't being deps injected, so must be called explicitly
    this.FORMATS = this.provider.getFormats()
  }

  onInit() {
    // Must be here because pageLength 
    // is not available until onInit
    this.reset(true)
  }
  switchMode(mode: DisplayMode) {
    this.displayMode = mode
    this.populateCalendar()
  }
  reset(abandonSelected = false) {
    let d = new Date()
    if (abandonSelected) this.selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    // this.args = [this.FORMATS.shortMonth[d.getMonth()],d.getFullYear(),this.pageLength]
    this.args = [this.FORMATS.shortMonth[d.getMonth()], d.getFullYear(), this.pageLength]
    this.todaysDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    this.populateCalendar()
  }
  gotoToday() {
    this.displayMode = this.modes.dayFromMonth
    this.reset(true)
  }
  // mode: dayFromMonth
  prevMonths() {
    [this.args[0], this.args[1]] = this.provider.prevMonth(<string>this.args[0], <number>this.args[1])
    this.populateCalendar()
  }
  nextMonths() {
    [this.args[0], this.args[1]] = this.provider.nextMonth(<string>this.args[0], <number>this.args[1])
    this.populateCalendar()
  }
  selectDateOfMonth(day:Date) {
    this.selectedDate = day
  }
  // mode: monthFromYear
  selectMonthOfYear(month:string) {
    this.args[0] = month
    this.switchMode(this.modes.dayFromMonth)
  }
  prevYear() {
    this.args[1]--
    this.populateCalendar()
  }
  nextYear() {
    this.args[1]++
    this.populateCalendar()
  }
  populateCalendar() {
      switch (this.displayMode) {
        case this.modes.monthFromYear:
          this.monthsOfYear = this.provider.getMonthsOfYear()
          break
        case this.modes.dayFromMonth:
        default:
          var [m, y, l] = this.args;
          this.daysOfMonths = this.provider.getWeeksOfMonths(<string>m, <number>y, <number>l)
      }
  }
  toggleCalendar() {
    if (this.isVisible) {
      this.daysOfMonths = []
    } else {
      this.args[0] = this.FORMATS.shortMonth[this.selectedDate.getMonth()]
      this.args[1] = this.selectedDate.getFullYear()
      this.populateCalendar()
    }
    this.isVisible = !this.isVisible
  }
}