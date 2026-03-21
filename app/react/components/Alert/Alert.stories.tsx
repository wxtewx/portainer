import { Meta, StoryFn } from '@storybook/react';

import { Alert } from './Alert';

export default {
  component: Alert,
  title: 'Components/Alert',
} as Meta;

interface Args {
  color: 'success' | 'error' | 'info';
  title: string;
  text: string;
}

function Template({ text, color, title }: Args) {
  return (
    <Alert color={color} title={title}>
      {text}
    </Alert>
  );
}

export const Success: StoryFn<Args> = Template.bind({});
Success.args = {
  color: 'success',
  title: '成功',
  text: '这是一条成功提示。非常长的文本，非常长的文本，非常长的文本，非常长的文本，非常长的文本，非常长的文本',
};

export const Error: StoryFn<Args> = Template.bind({});
Error.args = {
  color: 'error',
  title: '错误',
  text: '这是一条错误提示',
};

export const Info: StoryFn<Args> = Template.bind({});
Info.args = {
  color: 'info',
  title: '信息',
  text: '这是一条信息提示',
};
