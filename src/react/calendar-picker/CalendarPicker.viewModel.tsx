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
    modes:any
    FORMATS:any
}

class ViewModel extends CalendarComponent {
    getState():CalendarPickerState {
        return {
            isVisible: this.isVisible,
            displayMode: this.displayMode,
            args: this.args,
            daysOfMonths: this.daysOfMonths,
            monthsOfYear: this.monthsOfYear,
            selectedDate: this.selectedDate,
            modes: this.modes,
            FORMATS: this.FORMATS
        }
    }
}

let calendarService = new CalendarService()

export class CalendarPicker extends React.Component<CalendarPickerProps, CalendarPickerState> {
    public static defaultProps: CalendarPickerProps = { pageLength:1 }

    componentWillMount:()=>void
    componentWillReceiveProps:(props:CalendarPickerProps)=>void

    constructor(props: CalendarPickerProps) {
        super(props)
        let controller = new ViewModel(calendarService)

        Object.getOwnPropertyNames(CalendarComponent.prototype).forEach(name => {
            this[name] = (function(controller, target) {
                return function(){
                    controller[name].apply(controller, arguments)
                    this.setState(controller.getState())
                }.bind(target)
            })(controller, this)
        })

        this.componentWillMount = (function(controller, target){
            return function(){
                controller.pageLength = this.props.pageLength
                controller.onInit()
                this.setState(controller.getState())
            }.bind(target)
        })(controller, this)
        
        this.componentWillReceiveProps = (function(controller, target){
            return (function(){
                controller.pageLength = this.props.pagelength
                this.setState(controller.getState())
            }).bind(target)
        })(controller, this)
    }

    toggleCalendar: ()=>void
    selectDateOfMonth: ()=>void
    prevMonths: ()=>void
    nextMonths: ()=>void
    switchMode: ()=>void
    gotoToday: ()=>void

    selectMonthOfYear: ()=>void
    prevYear: ()=>void
    nextYear: ()=>void

    render() {
        return (
            <div className="fractal-calendar-picker">
                <p>Selected: {this.state.selectedDate.toString()} <button onClick={this.toggleCalendar}>+</button></p>
                
                {this.state.isVisible ? (
                    <div>
                        {this.state.displayMode === this.state.modes.dayFromMonth ? (
                            <DayFromMonthPicker 
                                selectedDate={this.state.selectedDate}
                                selectDateOfMonth={this.selectDateOfMonth}
                                daysOfMonths={this.state.daysOfMonths} 
                                prevMonths={this.prevMonths}
                                nextMonths={this.nextMonths}

                                FORMATS={this.state.FORMATS}
                                modes={this.state.modes}
                                switchMode={this.switchMode}
                                goToToday={this.gotoToday}
                            />
                        ) : (null)}
                        {this.state.displayMode === this.state.modes.monthFromYear ? (
                            <MonthFromYear 
                                selectMonthOfYear={this.selectMonthOfYear}
                                displayYear={this.state.args[1]}
                                monthsOfYear={this.state.monthsOfYear} 
                                prevYear={this.prevYear}
                                nextYear={this.prevMonths}

                                FORMATS={this.state.FORMATS}
                                modes={this.state.modes}
                                switchMode={this.switchMode}
                                goToToday={this.gotoToday}
                            />
                        ) : (null)}
                    </div>
                ) : (null) }
            </div>
        )
    }
}