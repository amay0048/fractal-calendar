import * as React from 'react'

interface MonthFromYearProps {
    modes: any
    FORMATS: any
    monthsOfYear: string[][]
    displayYear: string
    selectMonthOfYear: (month:string)=>void
    switchMode: (mode:number)=>void
    prevYear: ()=>void
    nextYear: ()=>void
    goToToday: ()=>void
}

export class MonthFromYear extends React.Component<MonthFromYearProps, undefined> {
    render() {
        return (
            <div className="multi-month-picker">
                <div className="header-controls">
                    <button className="prev" onClick={this.props.prevYear}>
                        &lt;
                    </button>
                    <button className="next"  onClick={this.props.nextYear}>
                        &gt;
                    </button>
                </div>
                <div className="body">
                    <table className="month-table">
                        <thead>
                            <tr>
                                <th colSpan={3}>
                                    <button onClick={()=>this.props.switchMode(this.props.modes.monthFromYear)}>
                                        {this.props.displayYear}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.monthsOfYear.map((quarter, index)=>{
                                return (
                                    <tr key={index}>
                                        {quarter.map((month, index)=>{
                                            return (
                                                <td key={index} onClick={()=>this.props.selectMonthOfYear(month)}>
                                                    {month}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="footer-controls">
                    <button  onClick={this.props.goToToday}>Today</button>
                </div>
            </div>
        )
    }
}