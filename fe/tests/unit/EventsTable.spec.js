import { expect, vi } from 'vitest';
import component from '@/components/tables/EventsTable.vue';
import { createTestWrapper } from '../utils.js';

vi.mock('vue-router');

const events = [{
  name: 'Test event 2',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}, {
  name: 'Test event 3',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}, {
  name: 'Test event 1',
  location: 'Threeflow',
  description: 'This is a test',
  startDate: '2024-01-01T00:00:00.000Z',
  userId: 2,
  attendees: 3,
}];

describe('EventsTable', () => {
  let wrapper;
  const createWrapper = async (initialData = {}) => {
    wrapper = await createTestWrapper({
      isShallow: false,
      component,
      mocks: {
        $route: {
          name: 'MyEvents',
        },
      },
      provide: {
        loadEvents: () => new Promise((resolve) => {
          resolve();
        }),
      },
      options: {
        slots: { ...initialData.slots },
        pinia: {
          initialState: {
            auth: {
              ...initialData.user,
            },
            events: {
              events: [
                ...events,
              ],
            },
          },
        },
      },
    });
  };

  it('should sort the table', async () => {
    await createWrapper();

    wrapper.vm.doSort({
      prop: 'name',
      order: 'ascending',
    });

    expect(wrapper.vm.localEvents[0].name).toEqual('Test event 1');

    wrapper.vm.doSort({
      prop: 'name',
      order: 'descending',
    });

    expect(wrapper.vm.localEvents[0].name).toEqual('Test event 3');
  });
});
