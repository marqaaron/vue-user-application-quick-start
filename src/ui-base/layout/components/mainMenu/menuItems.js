export default [
  {
    name: 'settings',
    headerText: 'Settings',
    link: '/settings',
    authRequired: true,
    display: true,
    externalLink: false,
    listPosition: 1,
    items: [
      {
        name: 'ui-configuration',
        title: 'UI Configuration',
        link: '/settings/ui-configuration',
        display: true,
        externalLink: false,
      },
      {
        name: 'user-access',
        title: 'User Access',
        link: '/settings/user-access',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'authentication',
    headerText: 'Authentication',
    link: '/login',
    authRequired: false,
    display: true,
    externalLink: false,
    listPosition: 2,
    items: [
      {
        name: 'login',
        title: 'Login',
        link: '/login',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'account',
    headerText: 'Account',
    link: '/account',
    authRequired: true,
    display: true,
    externalLink: false,
    listPosition: 3,
    items: [
      {
        name: 'profile',
        title: 'Profile',
        link: '/account/profile',
        display: true,
        externalLink: false,
      },
      {
        name: 'reset-password',
        title: 'Reset Password',
        link: '/reset-password',
        display: true,
        externalLink: false,
      }
    ]
  }
]
