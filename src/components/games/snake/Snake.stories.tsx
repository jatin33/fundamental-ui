import type { Meta, StoryObj } from '@storybook/react-vite';

import Snake from "./snake";

const meta = {
  component: Snake,
} satisfies Meta<typeof Snake>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};