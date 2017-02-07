import { Component } from '@angular/core';

@Component({
  selector: 'fractal-app',
  template: `
    <h1>Fractal Datepicker: @angular</h1>
    <h2>Example output: {{selectedDate}}</h2>
    <fractal-calendar-picker (selectDateEmitter)="onSelectDate($event)"></fractal-calendar-picker>
    <fractal-calendar-picker [pageLength]="3"></fractal-calendar-picker>
  `
})
export class AppComponent {
  selectedDate:Date
  onSelectDate(date:Date){
    this.selectedDate = date
    console.log('Scope Watch for Date Change: ' + date);
  }
}