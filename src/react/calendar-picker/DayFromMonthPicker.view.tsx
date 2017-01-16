import * as React from 'react'

interface DayFromMonthPickerProps {
    modes: any
    FORMATS: any
    daysOfMonths: Date[][][]
    selectedDate: Date
    selectDateOfMonth: (date:Date)=>void
    switchMode: (mode:number)=>void
    prevMonths: ()=>void
    nextMonths: ()=>void
    goToToday: ()=>void
}

function getClassOfDay(day:Date, month:Date[][], selectedDate:Date) {
    let ret = ''
    let d = new Date()
    if (d.getDate() === day.getDate() && d.getMonth() === day.getMonth()) ret += ' today'
    if (month[1][0].getMonth() !== day.getMonth()) ret += ' overflow'
    if (day === selectedDate) ret += ' selected'
    return ret.trim()
}

export class DayFromMonthPicker extends React.Component<DayFromMonthPickerProps, undefined> {
    render() {
        return (
            <div className="multi-month-picker">
                <div className="header-controls">
                    <button className="prev" onClick={this.props.prevMonths}>
                        &lt;
                    </button>
                    <button className="next"  onClick={this.props.nextMonths}>
                        &gt;
                    </button>
                </div>
                <div className="body">
                    {this.props.daysOfMonths.map((month, index)=>{
                        return (
                            <table key={index} className="month-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th colSpan={5}>
                                            <button onClick={()=>this.props.switchMode(this.props.modes.monthFromYear)}>
                                                {this.props.FORMATS.shortMonth[month[1][0].getMonth()]}
                                                {month[1][0].getFullYear()}
                                            </button>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {month.map((week, index)=>{
                                        return (
                                            <tr key={index}>
                                                {week.map((day, index)=>{
                                                    return (
                                                        <td key={index} 
                                                            onClick={()=>this.props.selectDateOfMonth(day)} 
                                                            className={getClassOfDay(day, month, this.props.selectedDate)}>
                                                            {day.getDate()}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )
                    })}
                </div>
                <div className="footer-controls">
                    <button  onClick={this.props.goToToday}>Today</button>
                </div>
            </div>
        )
    }
}