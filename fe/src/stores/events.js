import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    isModalVisible: false,
    editingEvent: null,
  }),

  actions: {
    /**
     * Set event list.
     *
     * @param {string} events
     */
    setEvents(events) {
      this.events.splice(0, this.events.length, ...events);
    },
    editEvent(event) {
      this.editingEvent = event;
      this.isModalVisible = true;
    },
    cancelEdit() {
      this.editingEvent = null;
      this.isModalVisible = false;
    },
  },
});
