import { Component } from '@angular/core';

@Component({
  selector: 'fractal-app',
  template: `
    <h1>Fractal Datepicker: @angular</h1>
    <fractal-calendar-picker></fractal-calendar-picker>
    <fractal-calendar-picker [pageLength]="3"></fractal-calendar-picker>
  `
})
export class AppComponent { }