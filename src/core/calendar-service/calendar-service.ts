export interface IFormats {
    initialOfDay: string[]
    shortDay: any
    shortMonth: any
}

enum Months {
    jan, feb, mar, apr, may, jun,
    jul, aug, sep, oct, nov, dec
}

enum DayOfWeek { sun, mon, tue, wed, thu, fri, sat }

export interface ICalendarService {
    getMonthsOfYear():any[][]

    getFormats(): IFormats
    getWeek(day:number, month:string, year:number):Date[]
    prevMonth(month:string, year:number):[string, number]
    nextMonth(month:string, year:number):[string, number]
    getWeeksOfMonth(month:string, year:number, length?:number):Date[][]
    getWeeksOfMonths(month:string, year:number, length?:number):Date[][][]
    getMonths(month?:string, length?:number):string[] 
    getMonthsByQuarter(quarter:number):string[]
}

export class CalendarService {
    // Inital of day
    private IOD = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    private DOW = DayOfWeek
    private MONTHS = Months
    constructor(){ }
    getFormats(): IFormats {
        return {
            initialOfDay: this.IOD,
            shortDay: this.DOW,
            shortMonth: this.MONTHS
        };
    }

    private parseDate(month:string, year:number, day = 1):Date {
        Months.hasOwnProperty(month)
        if (!this.MONTHS.hasOwnProperty(month)) throw 'Error parsing month';
        return new Date(year, this.MONTHS[month], day);
    }
    private addDays(date:Date, offset:number):Date {
        if (offset == 0) return date
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset)
    }
    private prevSunday(date:Date):Date {
        let offset = date.getDay() * -1
        return this.addDays(date, offset)
    }

    // WEEKS
    private isValidDate(d:any) {
        return (Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()))
    }
    private getWeekFromDate(date:Date):Date[] {
        if(!this.isValidDate(date)) throw 'Invalid date passed to getWeek'
        let start = this.prevSunday(date)
        let out = Array(7).fill(0).map((_, index)=>{
            return this.addDays(start, index)
        })
        return out
    }
    getWeek(day:number, month:string, year:number):Date[] {
        // (day e.g. 1, month e.g. jan, year e.g. 2017)
        // Takes a day, a month and a year, and returns
        // an array of days, from Sunday to Saturday

        let date = new Date(year, this.MONTHS[month], day)
        return this.getWeekFromDate(date)
    }

    // MONTHS
    private getWeekOfMonth(month:string, year:number, week:number):Date[] {
        week--
        // Probably don't need this check...
        if (5 < week || week < 0) throw 'Error parsing week'
        week = (week*7) + 1

        let d = this.parseDate(month, year, week)
        return this.getWeekFromDate(d)
    }
    // TODO: these require tests
    prevMonth(month:string, year:number):[string, number] {
        var monthIndex = this.MONTHS[month]
        monthIndex--
        if (monthIndex < 0) {
            monthIndex = this.MONTHS.dec
            year--
        }
        return [this.MONTHS[monthIndex], year]
    }
    nextMonth(month:string, year:number):[string, number] {
        var monthIndex = this.MONTHS[month]
        monthIndex++
        if (monthIndex > this.MONTHS.dec) {
            monthIndex = 0
            year++
        }
        return [this.MONTHS[monthIndex], year]
    }
    getWeeksOfMonth(month:string, year:number, length = 5):Date[][] {
        // (month e.g. jan, year e.g. 2017)
        // Takes a month and a year, and returns
        // an array of weeks for that month, 
        // from Sunday to Saturday

        if (!this.MONTHS.hasOwnProperty(month)) throw 'Invalid month passed to getMonth';

        let out = []
        for (let i=1; i<=length; i++) {
            out.push(this.getWeekOfMonth(month, year, i))
        }

        return out
    }
    getWeeksOfMonths(month:string, year:number, length = 1):Date[][][] {
        // (month e.g. jan, year e.g. 2017, length e.g. 2)
        // Takes a month, a year, and a number of months 
        // and returns an array of months each containing
        // an array of weeks for that month, 
        // from Sunday to Saturday

        var out = [this.getWeeksOfMonth(month, year)]
        for (var i=1; i<length; i++) {
            [month, year] = this.nextMonth(month, year)
            out.push(this.getWeeksOfMonth(month, year))
        }
        return out
    }
    
    getMonths(month = 'jan', length = 12):string[] {
        // (): returns and array of 12 months starting from jan
        // (month e.g. jan): returns an array of 12 months starting
        // from the argument
        // (month e.g. jan, length e.g. 6): returns an array of length 
        // months, starting from month

        console.warn('getMonths: needs new implementation, it should be year dependent, and should pass back dates not strings')
        // TODO: This needs a better implementation, year should be a parameter
        // should return {m:month, y:year}[]
        var d = new Date()
        var year = d.getFullYear()
        var out = [month]
        for (var i=1; i<length; i++) {
            [month, year] = this.nextMonth(month, year)
            out.push(month)
        }
        return out
    }
    getMonthsByQuarter(quarter:number):string[] {
        // (quarter e.g. 4) takes an integer representing the quarter
        // and returns the relevant 3 months

        if ( 1 > quarter || quarter > 4) throw 'Invalid quarter passed to getMonthsByQuarter'
        var start = 3 * (quarter-1)
        return this.getMonths(this.MONTHS[start], 3)
    }
}