const targetTypes = {
  clash: 'Clash',
  clashr: 'ClashR',
  quan: 'Quantumult',
  quanx: 'QuantumultX',
  loon: 'Loon',
  ss: 'SS (SIP002)',
  sssub: 'SS Android',
  ssd: 'SSD',
  ssr: 'SSR',
  surfboard: 'Surfboard',
  'surge&ver=2': 'Surge2',
  'surge&ver=3': 'Surge3',
  'surge&ver=4': 'Surge4',
  v2ray: 'V2Ray',
};

interface OptionData {
  label?: string;
  value: string;
}

const obtainUrlPrefix = () => {
  const pathname = location.pathname;
  if (pathname.endsWith('/')) {
    return pathname.substring(0, pathname.length - 1);
  } else {
    return pathname;
  }
};

const fetchRuleList = async () => {
  const response = await fetch(`${obtainUrlPrefix()}/rule-list.json`);
  return (await response.json()) as OptionData[];
};

const fetchBackendList = async () => {
  const response = await fetch(`${obtainUrlPrefix()}/backend-list.json`);
  return (await response.json()) as OptionData[];
};

export type { OptionData };

export { targetTypes, fetchRuleList, fetchBackendList };
