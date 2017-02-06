import * as React from 'react'
import { CalendarPicker } from '../calendar-picker/CalendarPicker.component'

export class FractalApp extends React.Component<undefined, undefined> {
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

import * as ReactDOM from 'react-dom'

ReactDOM.render(
  <FractalApp />,
  document.getElementById('fractal-app')
)