import type { Meta, StoryObj } from '@storybook/react';

import { localizeDate } from '@/react/common/date-utils';

import { Badge } from '@@/Badge';

import { BlocklistItem } from './BlocklistItem';

const meta: Meta<typeof BlocklistItem> = {
  title: 'Components/Blocklist/BlocklistItem',
  component: BlocklistItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="blocklist">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlocklistItem>;

export const Default: Story = {
  args: {
    children: '默认列表项',
  },
};

export const Selected: Story = {
  args: {
    children: '已选中列表项',
    isSelected: true,
  },
};

export const AsDiv: Story = {
  args: {
    children: '作为 div 的列表项',
    as: 'div',
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-wrap gap-1 justify-between">
          <Badge type="success">已部署</Badge>
          <span className="text-xs text-muted">版本 #4</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-between">
          <span className="text-xs text-muted">my-app-1.0.0</span>
          <span className="text-xs text-muted">
            {localizeDate(new Date('2000-01-01'))}
          </span>
        </div>
      </div>
    ),
  },
};

export const MultipleItems: Story = {
  render: () => (
    <div className="blocklist">
      <BlocklistItem>第一项</BlocklistItem>
      <BlocklistItem isSelected>第二项 (已选中)</BlocklistItem>
      <BlocklistItem>第三项</BlocklistItem>
    </div>
  ),
};
