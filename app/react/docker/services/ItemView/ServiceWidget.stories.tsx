import type { Meta, StoryObj } from '@storybook/react';

import { withUserProvider } from '@/react/test-utils/withUserProvider';

import { ServiceWidget } from './ServiceWidget';

const Wrapped = withUserProvider(ServiceWidget);

const meta: Meta<typeof ServiceWidget> = {
  component: ServiceWidget,
  render: (args) => <Wrapped {...args} />,
  args: {
    titleIcon: 'icon-name',
    title: '服务组件',
    onAdd: () => {},
    hasChanges: false,
    onReset: () => {},
    onSubmit: () => {},
    labelForAddButton: '添加',
    isValid: true,
    children: <div className="p-5">此服务未发布任何端口。</div>,
  },
};

export default meta;

type Story = StoryObj<typeof ServiceWidget>;

export const Default: Story = {};
