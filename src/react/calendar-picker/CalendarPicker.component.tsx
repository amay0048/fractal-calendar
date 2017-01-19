import '../../core/calendar-style/calendar-style.scss'
import * as React from 'react'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'
import { CalendarService } from '../../core/calendar-service/calendar-service'

import { DayFromMonthPicker } from './DayFromMonthPicker.view'
import { MonthFromYear } from './MonthFromYearPicker.view'

interface CalendarPickerProps { 
    pageLength?: number
    onSelectDate?: (date:Date)=>void
}

interface CalendarPickerState { 
    isVisible: boolean
    displayMode:number
    args: string[]
    daysOfMonths: Date[][][]
    monthsOfYear: string[][]
    selectedDate: Date
}

class ViewModel extends CalendarComponent {
    getState():CalendarPickerState {
        return {
            isVisible: this.isVisible,
            displayMode: this.displayMode,
            args: this.args,
            daysOfMonths: this.daysOfMonths,
            monthsOfYear: this.monthsOfYear,
            selectedDate: this.selectedDate
        }
    }
}

// Mixins may be a better pattern to achieve the desired results: https://www.typescriptlang.org/docs/handbook/mixins.html

let calendarService = new CalendarService()

export class CalendarPicker extends React.Component<CalendarPickerProps, CalendarPickerState> {
    public static defaultProps: CalendarPickerProps = { pageLength:1 }
    private vm: ViewModel

    componentWillMount() {
        this.vm.pageLength = this.props.pageLength
        this.vm.onInit()
        this.setState(this.vm.getState())
    }
    componentWillReceiveProps(props:CalendarPickerProps) {
        this.vm.pageLength = props.pageLength
    }

    constructor(props: CalendarPickerProps) {
        super(props)
        let controller = new ViewModel(calendarService)

        // TODO: Surely there is a object merge function which will handle this, 
        // otherwise explore return new ViewModel()...
        this.toggle = this.toggle.bind(this)
        this.switchMode = this.switchMode.bind(this)
        this.goToToday = this.goToToday.bind(this)

        this.selectDateOfMonth = this.selectDateOfMonth.bind(this)
        this.prevMonths = this.prevMonths.bind(this)
        this.nextMonths = this.nextMonths.bind(this)

        this.selectMonthOfYear = this.selectMonthOfYear.bind(this)
        this.prevYear = this.prevYear.bind(this)
        this.nextYear = this.nextYear.bind(this)
    }

    toggle(){
        this.vm.toggleCalendar()
        this.setState(this.vm.getState())
    }
    switchMode(mode:number) {
        this.vm.switchMode(mode)
        this.setState(this.vm.getState())
    }
    goToToday() {
        this.vm.gotoToday()
        this.setState(this.vm.getState())
    }

    // MonthFromYearPicker
    prevMonths() {
        this.vm.prevMonths()
        this.setState(this.vm.getState())
    }
    nextMonths() {
        this.vm.nextMonths()
        this.setState(this.vm.getState())
    }
    selectDateOfMonth(date: Date) {
        this.vm.selectDateOfMonth(date)
        this.setState(this.vm.getState())
        if (this.props.onSelectDate instanceof Function) this.props.onSelectDate(this.state.selectedDate)
    }

    // DayFromMonthPicker
    nextYear() {
        this.vm.nextYear()
        this.setState(this.vm.getState())
    }
    prevYear() {
        this.vm.prevYear()
        this.setState(this.vm.getState())
    }
    selectMonthOfYear(month:string) {
        this.vm.selectMonthOfYear(month)
        this.setState(this.vm.getState())
    }

    render() {
        return (
            <div className="fractal-calendar-picker">
                <p>Selected: {this.vm.selectedDate.toString()} <button onClick={this.toggle}>+</button></p>
                
                {this.state.isVisible ? (
                    <div>
                        {this.state.displayMode === this.vm.modes.dayFromMonth ? (
                            <DayFromMonthPicker 
                                selectedDate={this.state.selectedDate}
                                selectDateOfMonth={this.selectDateOfMonth}
                                daysOfMonths={this.state.daysOfMonths} 
                                prevMonths={this.prevMonths}
                                nextMonths={this.nextMonths}

                                FORMATS={this.vm.FORMATS}
                                modes={this.vm.modes}
                                switchMode={this.switchMode}
                                goToToday={this.goToToday}
                            />
                        ) : (null)}
                        {this.state.displayMode === this.vm.modes.monthFromYear ? (
                            <MonthFromYear 
                                selectMonthOfYear={this.selectMonthOfYear}
                                displayYear={this.state.args[1]}
                                monthsOfYear={this.state.monthsOfYear} 
                                prevYear={this.prevYear}
                                nextYear={this.prevMonths}

                                FORMATS={this.vm.FORMATS}
                                modes={this.vm.modes}
                                switchMode={this.switchMode}
                                goToToday={this.goToToday}
                            />
                        ) : (null)}
                    </div>
                ) : (null) }
            </div>
        )
    }
}
