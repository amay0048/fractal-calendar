import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CalendarPicker }  from '../calendar-picker/calendar-picker.component';
import { CalendarProvider }  from '../calendar-picker/calendar-picker.provider';

// import * as asb from 'asb-dnd';
import * as asb2 from '../../../node_modules/asb-dnd/src/directives/asb-draggable_directive'

@NgModule({
  imports:      [ BrowserModule /* , asb.AsbDragAndDropModule */ ],
  declarations: [ AppComponent, CalendarPicker, asb2.AsbDraggableDirective ],
  providers:    [ CalendarProvider ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }