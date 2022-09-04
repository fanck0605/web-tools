import type { FC } from 'react';
import { useState } from 'react';
import { Card, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

const Base64EncodeDecode: FC = () => {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');

  return (
    <PageContainer>
      <Card title="Base64 加密解密">
        明文：
        <Input.TextArea
          placeholder="明文数据"
          rows={5}
          allowClear
          value={text}
          onChange={(e) => {
            const input = e.target.value;
            setText(input);
            console.log(input.length);
            try {
              setBase64(btoa(input));
            } catch (ex: any) {
              console.error(ex);
            }
          }}
        />
        明文：
        <Input.TextArea
          placeholder="密文数据"
          rows={5}
          allowClear
          value={base64}
          onChange={(e) => {
            const input = e.target.value;
            setBase64(input);
            try {
              setText(atob(input));
            } catch (ex: any) {
              console.error(ex);
            }
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Base64EncodeDecode;
