import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import Subconverter from './components/Subconverter';

const SubscriptionConverter: FC = () => {
  return (
    <PageContainer>
      <Subconverter />
    </PageContainer>
  );
};

export default SubscriptionConverter;
