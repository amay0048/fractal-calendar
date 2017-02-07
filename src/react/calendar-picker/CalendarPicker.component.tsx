import '../../core/calendar-style/calendar-style.scss'
import * as React from 'react'
import { calendarService } from './CalendarService'
import { CalendarComponent } from '../../core/calendar-component/calendar-component'

import { DayFromMonthPicker } from './DayFromMonthPicker.view'
import { MonthFromYear } from './MonthFromYearPicker.view'

interface CalendarPickerProps { 
    pageLength?: number
    onSelectDate?: (date:Date)=>void
}

// Create an interface for the controller properties that
// make up the component state (these are used in conditional)
// logic in the render function, or by the child views
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

// In React, component state is write only, I've extended the core component
// with a react specific function that allows me to utalize the native React method
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

// React components extend the Component class, currently you can only extend from 
// a single class, which cases some issues with reusing the core component class
export class CalendarPicker extends React.Component<CalendarPickerProps, CalendarPickerState> {
    public static defaultProps: CalendarPickerProps = { pageLength:1 }

    componentWillMount:()=>void
    componentWillReceiveProps:(props:CalendarPickerProps)=>void

    constructor(props: CalendarPickerProps) {
        super(props)
        // instiantiate controller for this instance
        let controller = new ViewModel(calendarService)

        // Bind the controller functions to the component
        Object.getOwnPropertyNames(CalendarComponent.prototype).forEach(name => {
            this[name] = (function(controller, target) {
                return function(){
                    controller[name].apply(controller, arguments)
                    // Update the component state after an event
                    this.setState(controller.getState())
                }.bind(target)
            })(controller, this)
        })

        // Run component init on mount
        this.componentWillMount = (function(controller, target){
            return function(){
                controller.pageLength = this.props.pageLength
                controller.onInit()
                this.setState(controller.getState())
            }.bind(target)
        })(controller, this)
        
        // Update the controller props if new values are recieved
        this.componentWillReceiveProps = (function(controller, target){
            return (function(){
                controller.pageLength = this.props.pagelength
                this.setState(controller.getState())
            }).bind(target)
        })(controller, this)
    }

    // Function declarations to match the implementations, these 
    // will be populated when the controller is bound in the constructor
    toggleCalendar: ()=>void
    selectDateOfMonth: ()=>void
    prevMonths: ()=>void
    nextMonths: ()=>void
    switchMode: ()=>void
    gotoToday: ()=>void

    selectMonthOfYear: ()=>void
    prevYear: ()=>void
    nextYear: ()=>void

    // The tsconfig.json file needs to an extra property to support jsx syntax
    render() {
        return (
            <div className="fractal-calendar-picker">
                <p>Selected: {this.state.selectedDate.toString()} 
                    <img className="calendar-icon" src="img/calendar_icon.svg" onClick={this.toggleCalendar} />
                </p>
                
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