import type { FC } from 'react';
import { useState } from 'react';
import { Card, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';

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
            try {
              const utf8Bytes = Utf8.parse(input);
              setBase64(Base64.stringify(utf8Bytes));
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
              const utf8Bytes = Base64.parse(input);
              setText(Utf8.stringify(utf8Bytes));
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
