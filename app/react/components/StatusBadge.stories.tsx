import { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';

import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    children: '默认',
  },
};

export const WithIcon: Story = {
  args: {
    icon: Check,
    children: '带图标',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    children: '成功',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    children: '警告',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    children: '危险',
  },
};

export const WithAriaAttributes: Story = {
  args: {
    'aria-label': '带 Aria 属性的徽章',
    children: '带 Aria 属性',
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <span role="img" aria-label="Star">
          ⭐️
        </span>
        带子元素
      </>
    ),
  },
};
