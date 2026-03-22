import { Meta, StoryFn } from '@storybook/react';
import { PropsWithChildren } from 'react';

import { TextTip } from './TextTip';

export default {
  component: TextTip,
  title: 'Components/Tip/TextTip',
} as Meta;

function Template({
  children,
}: JSX.IntrinsicAttributes & PropsWithChildren<unknown>) {
  return <TextTip>{children}</TextTip>;
}

export const Primary: StoryFn<PropsWithChildren<unknown>> = Template.bind({});
Primary.args = {
  children: '这是一条带内容的文本提示',
};
