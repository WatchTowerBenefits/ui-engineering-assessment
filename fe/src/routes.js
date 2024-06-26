/**
 * Direct user to sign in page depending on if user is authenticated and confirmed
 *
 * @param {object} to
 * @param {object} from
 * @param {Function} next
 */
function requireAuth(to, from, next) {
  const auth = window.localStorage.getItem('auth') === 'true';

  if (auth) {
    next();
  } else {
    next({
      name: 'SignIn',
    });
  }
}

export const routes = [
  {
    path: '/',
    component: () => import('@/views/MainDashboard.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/components/UpcomingEvents.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    alias: '/login',
    name: 'SignIn',
    component: () => import('@/views/SignInView.vue'),
  },
  {
    path: '/users',
    beforeEnter: requireAuth,
    component: () => import('@/views/MainDashboard.vue'),
    children: [
      {
        path: '',
        name: 'Users',
        component: () => import('@/components/tables/UsersTable.vue'),
      },
    ],
  },
  {
    path: '/events',
    name: 'Events',
    props: true,
    beforeEnter: requireAuth,
    component: () => import('@/views/MainDashboard.vue'),
    redirect: '/events/my-events',
    children: [
      {
        path: ':eventId',
        name: 'ViewEvent',
        beforeEnter: requireAuth,
        component: () => import('@/components/ViewEvent.vue'),
        props: true,
      },
      {
        path: 'my-events',
        name: 'MyEvents',
        beforeEnter: requireAuth,
        component: () => import('@/components/tables/EventsTable.vue'),
        props() {
          return {
            eventsType: 'myEvents',
          };
        },
      },
      {
        path: 'past-events',
        name: 'PastEvents',
        beforeEnter: requireAuth,
        component: () => import('@/components/tables/EventsTable.vue'),
        props() {
          return {
            eventsType: 'pastEvents',
          };
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*/',
    component: () => import('@/views/NotFound.vue'),
  },
];
