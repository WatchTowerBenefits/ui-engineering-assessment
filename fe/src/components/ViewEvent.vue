// Single event view

<template>
  <ElCard v-if="event" class="event-card">
    <template #header>
      <div class="card-header">
        <h3>{{ event.name }}</h3>
        <div class="when-where">
          <div>
            <ElIcon><Calendar /></ElIcon>
            {{ dateFormatter(event.startDate) }}
          </div>
          <b>
            {{ event.location }}
          </b>
        </div>
      </div>
    </template>
    {{ event.description || 'No description' }}
    <template #footer>
      <div class="card-footer">
        <div class="footer-buttons">
          <span v-if="authenticated">
            <ElButton
              v-if="event.userId === user.id"
              data-test="edit-event-button"
              type="primary"
              @click="editEvent(event)"
            >
              Edit
            </ElButton>
            <ElButton
              v-else-if="attending(event)"
              data-test="delete-event-button"
              type="danger"
              @click="declineEvent(event)"
            >
              Decline
            </ElButton>
            <ElButton
              v-else
              data-test="attend-event-button"
              type="success"
              @click="attendEvent(event)"
            >
              Attend
            </ElButton>
          </span>
          <ElButton
            v-else
            type="primary"
            data-test="sign-in-button"
            @click="() => $router.push({ name: 'SignIn' })"
          >
            Sign In to RSVP
          </ElButton>
          <strong>Attendees: {{ attendeesList }}</strong>
        </div>
      </div>
    </template>
  </ElCard>
</template>

<script>
  import { mapActions, mapState, mapWritableState } from 'pinia';
  import { useAuthStore } from '@/stores/auth.js';
  import { useEventsStore } from '@/stores/events.js';
  import { getEvent, declineEvent, joinEvent } from '@/services/events.js';
  import { formatDate } from '@/utils/common.js';

  export default {
    name: 'UpcomingEvents',
    props: {
      eventId: {
        type: [Number, String],
        required: true,
      },
    },
    data() {
      return {
        event: null,
      };
    },
    computed: {
      ...mapWritableState(useAuthStore, ['authenticated', 'user']),
      ...mapState(useEventsStore, ['events']),
      /**
       * List of attendee names pulled from the API
       *
       * @returns {Array}
       */
      attendeesList() {
        return this.event.attendees.map(({ firstName, lastName }) => `${firstName} ${lastName}`).toString();
      },
    },
    async created() {
      /**
       * Load event data into store
       */
      await this.loadEvent();
    },
    methods: {
      ...mapActions(useAuthStore, ['setUser']),
      ...mapActions(useEventsStore, ['editEvent']),
      /**
       * Load event
       */
      async loadEvent() {
        this.event = await getEvent(this.eventId);
      },
      /**
       * Format date helper
       *
       * @param {string} dateString
       * @returns {Date}
       */
      dateFormatter(dateString) {
        return formatDate(dateString);
      },
      /**
       * Determine if the user is attending an event
       *
       * @param {object} root
       * @param {number} root.id
       * @returns {boolean}
       */
      attending({ id: eventId }) {
        return this.user.attendingEvents.find(({ id }) => id === eventId);
      },
      /**
       * Call API to mark user as attending an event and update store
       *
       * @param {object} event
       */
      async attendEvent(event) {
        await joinEvent(event.id, this.user.id);
        this.user.attendingEvents.push(event);
      },
      /**
       * Decline event and update store
       *
       * @param {object} root
       * @param {number} root.id
       */
      async declineEvent({ id }) {
        await declineEvent(id, this.user.id);

        this.user.attendingEvents = this.user.attendingEvents.filter((event) => event.id !== id);
      },
    },
  };
</script>

<style lang="scss" scoped>
.event-card {
  display: inline-block;
  width: 900px;
  padding: 1em;

  :deep(.el-card) {
    margin: 1em 0;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;

  .when-where {
    text-align: right;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.footer-buttons {
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
}

h3 {
  margin: 0;
}
</style>
