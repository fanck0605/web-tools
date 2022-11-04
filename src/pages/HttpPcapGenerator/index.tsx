import type { FC } from 'react';
import { Card, Modal } from 'antd';
import { PageContainer, ProForm, ProFormTextArea } from '@ant-design/pro-components';
import type { HttpPcapRequest } from '@/pages/HttpPcapGenerator/services';
import { generatePcap } from '@/pages/HttpPcapGenerator/services';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const HttpPcapGenerator: FC = () => {
  return (
    <PageContainer>
      <Card title="HTTP PCAP 包生成器">
        <ProForm<HttpPcapRequest>
          onFinish={async (values) => {
            const { data } = await generatePcap(values);
            Modal.confirm({
              title: 'PCAP 包生成成功！',
              icon: <ExclamationCircleOutlined />,
              content: (
                <>
                  服务器已经生成了对应的 PCAP 包，<a href={data.downloadUrl}>立即下载！</a>
                </>
              ),
            });
          }}
        >
          <ProFormTextArea name="httpRequest" label="HTTP 请求" />
          <ProFormTextArea name="httpResponse" label="HTTP 响应" />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default HttpPcapGenerator;
