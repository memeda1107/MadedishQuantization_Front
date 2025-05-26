<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
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
      console.log('...............selectInfo',selectInfo.startStr)
      const vm = this;
      vm.$router.push({
        name: "ReviewDiary",
        query: {
          id: null,
          type: "add",
          date:selectInfo.startStr
        }
      });
    },
    handleEventClick(clickInfo) {
      console.log('...............clickInfo',clickInfo.event.extendedProps)
      const vm = this;
      vm.$router.push({
        name: "ReviewDiary",
        query: {
          id: clickInfo.event.id,
          type: "edit",
          // date:clickInfo.event.extendedProps.recordDate
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
        <h2></h2>
        <ul>
          <li>行情总在绝望中诞生，在半信半疑中成长，在憧憬中成熟，在希望中毁灭。"——约翰·邓普顿</li>
          <li>保住本金最重要。第二条：永远不要忘记第一条。——沃伦·巴菲特</li>
          <li>看不懂、看不准、没把握时坚决不进场。</li>
        </ul>
      </div>
      <!-- <div class='demo-app-sidebar-section'>
        <label>
          <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
          toggle weekends
        </label>
      </div> -->
      <!-- <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div> -->
    </div>
    <div class='demo-app-main'>
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <i :style="{ color: arg.event.extendedProps.income > 0 ? 'red' : arg.event.extendedProps.income< 0 ? 'green' : 'inherit',fontSize: '20px'  } ">
            {{ arg.event.title }}
          </i>
           <!-- <i>{{console.log('...............arg',arg.event.extendedProps.income)}}</i> -->
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
  max-width: 900px;
  margin: 0 auto;
}
</style>
