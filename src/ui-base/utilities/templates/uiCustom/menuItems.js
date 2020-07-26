export default [
  {
    name: 'dashboard',
    headerText: 'Dashboard',
    link: '/dashboard',
    authRequired: true,
    display: true,
    externalLink: false,
    listPosition: 4,
    items: [
      {
        name: 'dashboardItem1',
        title: 'Dashboard Item 1',
        link: '/dashboard/dashboardItem1',
        display: true,
        externalLink: false,
      },
      {
        name: 'dashboardItem2',
        title: 'Dashboard Item 2',
        link: '/dashboard/dashboardItem2',
        display: true,
        externalLink: false,
      },
      {
        name: 'dashboardItem3',
        title: 'Dashboard Item 3',
        link: '/dashboard/dashboardItem3',
        display: true,
        externalLink: false,
      }
    ]
  }
]
