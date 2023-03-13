import { Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  /* calendarOptions: CalendarOptions = {
     initialView: 'dayGridMonth',
     plugins: [dayGridPlugin],
     headerToolbar: {
       left: 'prev,next',
       center: 'title',
       right: 'dayGridWeek,dayGridDay'
     },
     events: []
   };
   */
  constructor() { }
}
