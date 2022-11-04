export default [
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/subscription-converter',
    name: 'subscription-converter',
    component: './SubscriptionConverter',
  },
  {
    path: '/base64-encode-decode',
    name: 'base64-encode-decode',
    component: './Base64EncodeDecode',
  },
  {
    path: '/pcap-generator',
    name: 'pcap-generator',
    component: './HttpPcapGenerator',
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
