import { toCamelCase } from './utils'

export class AppComponent implements ng.IComponentOptions {
    template = `
        <h1>Fractal Datepicker: angular1</h1>
        <fractal-calendar-picker></fractal-calendar-picker>
        <fractal-calendar-picker page-length="3"></fractal-calendar-picker>
    `
}
AppComponent.componentSelector = toCamelCase('fractal-app')