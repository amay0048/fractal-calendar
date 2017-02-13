import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CalendarPicker }  from '../calendar-picker/calendar-picker.component';
import { CalendarProvider }  from '../calendar-picker/calendar-picker.provider';

import * as asb from 'asb-dnd';

@NgModule({
  imports:      [ BrowserModule, asb.AsbDragAndDropModule ],
  declarations: [ AppComponent, CalendarPicker ],
  providers:    [ CalendarProvider ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }