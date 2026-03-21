import { Meta, StoryFn } from '@storybook/react';
import { PropsWithChildren } from 'react';
import { Download } from 'lucide-react';

import { Button, Props } from './Button';

export default {
  component: Button,
  title: 'Components/Buttons/Button',
} as Meta;

export function DifferentTheme() {
  const colors = [
    'primary',
    'secondary',
    'danger',
    'dangerlight',
    'light',
    'link',
  ] as const;

  const themes = ['light', 'dark', 'highcontrast'] as const;
  const states = ['', 'disabled'] as const;
  return (
    <table>
      <thead>
        <tr>
          <th>颜色/主题</th>
          {themes.map((theme) => (
            <th key={theme} className="text-center">
              {theme}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {colors.map((color) => (
          <tr key={color}>
            <td>{color}</td>
            {themes.map((theme) => (
              <td
                key={theme}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment,
                // @ts-ignore
                // eslint-disable-next-line react/no-unknown-property
                theme={theme}
                className="p-5"
                style={{ background: 'var(--bg-body-color)' }}
              >
                {states.map((state) => (
                  <Button
                    color={color}
                    data-cy="button"
                    key={state}
                    disabled={state === 'disabled'}
                  >
                    {state} {color} 按钮
                  </Button>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Template({
  onClick,
  color,
  size,
  disabled,
}: JSX.IntrinsicAttributes & PropsWithChildren<Props>) {
  return (
    <Button
      onClick={onClick}
      color={color}
      size={size}
      disabled={disabled}
      data-cy="button"
    >
      主要按钮
    </Button>
  );
}

export const Primary: StoryFn<PropsWithChildren<Props>> = Template.bind({});
Primary.args = {
  color: 'primary',
  size: 'small',
  disabled: false,
  onClick: () => {
    alert('你好，按钮！');
  },
};

export function Disabled() {
  return (
    <Button color="primary" onClick={() => {}} disabled data-cy="button">
      禁用按钮
    </Button>
  );
}

export function Danger() {
  return (
    <Button color="danger" onClick={() => {}} data-cy="button">
      危险按钮
    </Button>
  );
}

export function ButtonIcon() {
  return (
    <Button color="primary" onClick={() => {}} icon={Download} data-cy="button">
      带图标的按钮
    </Button>
  );
}

export function ButtonIconLarge() {
  return (
    <Button
      color="primary"
      onClick={() => {}}
      icon={Download}
      size="large"
      data-cy="button"
    >
       带图标的按钮
    </Button>
  );
}

export function ButtonIconMedium() {
  return (
    <Button
      color="primary"
      onClick={() => {}}
      icon={Download}
      size="medium"
      data-cy="button"
    >
       带图标的按钮
    </Button>
  );
}

export function ButtonIconXSmall() {
  return (
    <Button
      color="primary"
      onClick={() => {}}
      icon={Download}
      size="xsmall"
      data-cy="button"
    >
       带图标的按钮
    </Button>
  );
}

export function Default() {
  return (
    <Button color="default" onClick={() => {}} data-cy="button">
      默认
    </Button>
  );
}

export function Link() {
  return (
    <Button color="link" onClick={() => {}} data-cy="button">
      链接按钮
    </Button>
  );
}

export function XSmall() {
  return (
    <Button color="primary" onClick={() => {}} size="xsmall" data-cy="button">
      超小按钮
    </Button>
  );
}

export function Small() {
  return (
    <Button color="primary" onClick={() => {}} size="small" data-cy="button">
      小按钮
    </Button>
  );
}

export function Large() {
  return (
    <Button color="primary" onClick={() => {}} size="large" data-cy="button">
      大按钮
    </Button>
  );
}
