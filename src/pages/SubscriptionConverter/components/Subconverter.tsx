import type { AutoCompleteProps, CardProps, FormProps } from 'antd';
import { AutoComplete, Button, Card, Divider, Form, Input, message, Select } from 'antd';
import type { ChangeEvent } from 'react';
import React, { useCallback, useEffect, useMemo } from 'react';
import useBackendList from '../hooks/useBackendList';
import useRuleList from '../hooks/useRuleList';
import type { SelectiveSubscriptionConfig, SubscriptionConfig } from '../utils/subscription';
import { dumpSubscriptionUrl, loadSubscriptionUrl } from '../utils/subscription';
import { targetTypes } from '../utils/options';
import { ApiOutlined } from '@ant-design/icons';
import styles from './Subconverter.less';

type FormLayoutProps = {
  labelCol?: FormProps['labelCol'];
  wrapperCol?: FormProps['wrapperCol'];
};

const formItemLayout: FormLayoutProps = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 5 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 17 },
    sm: { span: 17 },
    md: { span: 18 },
  },
};

const tailFormItemLayout: FormLayoutProps = {
  wrapperCol: { span: 24 },
};

const matchesOptionData: AutoCompleteProps['filterOption'] = (inputValue, option) =>
  option
    ? option.label
      ? (option.label as string).toUpperCase().includes(inputValue.toUpperCase())
      : (option.value as string).includes(inputValue)
    : false;

const renderTargetTypeOption = ([targetType, targetName]: [string, string], key: number) => (
  <Select.Option value={targetType} key={key}>
    {targetName}
  </Select.Option>
);

const comingSoon = () => {
  message.warning('敬请期待');
};

const Subconverter: React.FC<CardProps> = (props) => {
  console.debug('Subconverter render');

  const [configForm] = Form.useForm();
  const [resultForm] = Form.useForm();

  const backendList = useBackendList();
  const ruleList = useRuleList();

  useEffect(() => {
    if (backendList[0] && !configForm.getFieldValue('backendUrl')) {
      configForm.setFieldsValue({ backendUrl: backendList[0].value });
    }
  }, [configForm, backendList]);

  useEffect(() => {
    if (ruleList[0] && !configForm.getFieldValue('ruleUrl')) {
      configForm.setFieldsValue({ ruleUrl: ruleList[0].value });
    }
  }, [configForm, ruleList]);

  const initialConfig = useMemo(() => {
    const config: SelectiveSubscriptionConfig = { targetType: 'clash' };

    const backendUrl = backendList[0]?.value;
    if (backendUrl) config.backendUrl = backendUrl;
    const ruleUrl = ruleList[0]?.value;
    if (ruleUrl) config.ruleUrl = ruleUrl;

    return config;
  }, [backendList, ruleList]);

  const generateSubscriptionUrl = useCallback(() => {
    configForm
      .validateFields()
      .then((config: SubscriptionConfig) => {
        const subscriptionUrl = dumpSubscriptionUrl(config);
        resultForm.setFieldsValue({ subscriptionUrl });
      })
      .catch(() => console.error('订阅链接生成错误！'));
  }, [configForm, resultForm]);

  const handleSubscriptionUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: subscriptionUrl } = event.target;
      try {
        const subscriptionConfig = loadSubscriptionUrl(subscriptionUrl);
        configForm.setFieldsValue(subscriptionConfig);
      } catch (e) {
        console.error('错误的订阅链接！');
      }
    },
    [configForm],
  );

  return (
    <Card {...props} title="Subscription Converter">
      <Form {...formItemLayout} form={configForm} initialValues={initialConfig}>
        <Form.Item
          label="订阅链接"
          name="sourceUrls"
          rules={[{ required: true, message: '订阅链接不可为空' }]}
        >
          <Input.TextArea placeholder="请输入订阅链接地址" rows={3} allowClear />
        </Form.Item>

        <Form.Item
          label="目标类型"
          name="targetType"
          rules={[{ required: true, message: '目标类型不可为空' }]}
        >
          <Select>{Object.entries(targetTypes).map(renderTargetTypeOption)}</Select>
        </Form.Item>

        <Form.Item
          label="后端地址"
          name="backendUrl"
          rules={[{ required: true, message: '后端地址不可为空' }]}
        >
          <AutoComplete
            placeholder="请输入后端服务器地址"
            options={backendList as any}
            allowClear
            filterOption={matchesOptionData}
          />
        </Form.Item>

        <Form.Item
          label="规则地址"
          name="ruleUrl"
          rules={[{ required: true, message: '规则地址不可为空' }]}
        >
          <AutoComplete
            placeholder="请输入远程规则地址"
            options={ruleList as any}
            allowClear
            filterOption={matchesOptionData}
          />
        </Form.Item>

        <Form.Item label="文件名称" name="filename">
          <Input placeholder="请输入文件名称" allowClear />
        </Form.Item>

        <Form.Item label="启用 UDP" name="enableUdp">
          <Select placeholder="请选择是否启用 UDP" allowClear>
            <Select.Option value="true">开启</Select.Option>
            <Select.Option value="false">关闭</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <Divider>
        <ApiOutlined />
      </Divider>

      <Form {...formItemLayout} form={resultForm}>
        <Form.Item label="订阅链接" name="subscriptionUrl">
          <Input onChange={handleSubscriptionUrlChange} />
        </Form.Item>
        <Form.Item label="订阅短链" name="shortSubscriptionUrl">
          <Input />
        </Form.Item>
      </Form>

      <Form {...tailFormItemLayout}>
        <Form.Item>
          <div className={styles.tailButtonContainer}>
            <Button className={styles.tailButton} type="primary" onClick={generateSubscriptionUrl}>
              生成链接
            </Button>
            <Button className={styles.tailButton} type="primary" onClick={comingSoon}>
              生成短链
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Subconverter;
