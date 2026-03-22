import { Meta, StoryFn } from '@storybook/react';

import { InsightsBox, Props } from './InsightsBox';

export default {
  component: InsightsBox,
  header: 'Components/InsightsBox',
} as Meta;

function Template({ header, content }: Props) {
  return <InsightsBox header={header} content={content} />;
}

export const Primary: StoryFn<Props> = Template.bind({});
Primary.args = {
  header: '信息面板标题',
  content: '这是信息面板的内容',
};
