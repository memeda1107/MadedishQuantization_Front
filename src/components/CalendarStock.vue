<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId, INITIAL_EVENTS } from './event-utils'
import axios from 'axios';
// import { forEach } from 'core-js/core/array'
export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: [],
        eventColor: '#378006'
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      axios.get('http://127.0.0.1:5000/api/get_events')
        .then(response => {
          console.log('。。。。。。。。。。。。。。。。。。。Response:', response.data);
          this.calendarOptions.events = response.data
          // this.currentEvents=response.data
          console.log('。。。。。。。。。。。。。。。。。。。events:', this.calendarOptions.events);

        
          // 处理成功响应，例如显示成功消息等
          // message.success('保存成功', 3);
        })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误响应，例如显示错误消息等
        });
    },

    getColor(event) {
      return event.income > 0 ? 'red' : event.income < 0 ? 'green' : 'inherit';
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      const vm = this;
      return vm.$router.push({ name: "ReviewDiary", param: createEventId, selectInfo });
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      const vm = this;
      vm.$router.push({
        name: "ReviewDiary",
        query: {
          id: clickInfo.event.id,
          type: "edit"
        }
      });
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
})

</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <i :class="arg.event.income > 0 ? 'fa fa-arrow-up red' : 'fa fa-arrow-down green'"></i>
          <i :style="{ color: arg.event.extendedProps.income > 0 ? 'red' : arg.event.extendedProps.income< 0 ? 'green' : 'inherit' }">
            {{ arg.event.title }}
          </i>
           <i>{{console.log('...............arg',arg.event.extendedProps.income)}}</i>
          
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
