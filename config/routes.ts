export default [
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/subscription-converter',
    name: 'subscription-converter',
    component: './ComingSoon',
  },
  {
    path: '/base64-encode-decode',
    name: 'base64-encode-decode',
    component: './ComingSoon',
  },
  {
    path: '/pcap-generator',
    name: 'pcap-generator',
    component: './ComingSoon',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    component: './404',
  },
];
