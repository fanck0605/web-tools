import { useEffect, useState } from 'react';
import type { OptionData } from '../utils/options';
import { fetchBackendList } from '../utils/options';

const useBackendList = () => {
  const [backendList, setBackendList] = useState<OptionData[]>([]);
  useEffect(() => {
    let ignore = false;

    const localSubconverter = [
      {
        value: window.location.origin + '/sub',
      },
    ];
    setBackendList(localSubconverter);

    fetchBackendList().then((newBackendList) => {
      if (ignore) return;
      setBackendList(localSubconverter.concat(newBackendList));
    });

    return () => {
      ignore = true;
    };
  }, []);
  return backendList;
};

export default useBackendList;
