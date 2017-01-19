import * as React from 'react'
import { CalendarPicker } from '../calendar-picker/CalendarPicker.viewModel'

export class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <h1>Fractal Datepicker: react</h1>
                <CalendarPicker />
                <CalendarPicker pageLength={3} />
            </div>
        )
    }
}
