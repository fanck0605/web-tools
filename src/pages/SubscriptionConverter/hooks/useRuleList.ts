import { useEffect, useState } from 'react';
import type { OptionData } from '../utils/options';
import { fetchRuleList } from '../utils/options';

const useRuleList = () => {
  const [ruleList, setRuleList] = useState<OptionData[]>([]);
  useEffect(() => {
    let ignore = false;

    fetchRuleList().then((newRuleList) => {
      if (ignore) return;
      setRuleList(newRuleList);
    });

    return () => {
      ignore = true;
    };
  }, []);
  return ruleList;
};

export default useRuleList;
