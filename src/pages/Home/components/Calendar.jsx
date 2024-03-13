import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    events: [
      { id: 1, title: "event 1", date: "2019-12-01" },
      {
        title: "event 2",
        start: "2019-01-14",
        end: "2019-12-05",
        allDay: true,
        HostName: "William"
      },
      {
        title: "event 3",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 4",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 5",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 6",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      }
    ]
  };

  handleDateClick = arg => {
    alert(arg.dateStr);
  };

  handleSelectedDates = info => {
    alert("selected " + info.startStr + " to " + info.endStr);
    const title = prompt("What's the name of the title");
    console.log(info);
    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr
      };
      const data = [...this.state.events, newEvent];
      this.setState({ events: data });
      alert("here " + newEvent.title);
      
      data.forEach(element => {
        console.log(element.title)
      });
      
    } else {
      console.log("nothing");
    }
  };

  render() {
    return (
      <div>
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={this.calendarComponentRef}
          defaultView="dayGridMonth"
          dateClick={this.handleDateClick}
          displayEventTime={true}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          selectable={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
          ]}
          eventClick={event => {
            console.log(event.event._def.publicId);
          }}
          events={this.state.events}
          select={this.handleSelectedDates}
          eventLimit={3}
        />
      </div>
    );
  }

}

export default Calendar

