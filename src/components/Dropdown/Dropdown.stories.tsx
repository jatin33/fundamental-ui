import type { Meta, StoryObj } from '@storybook/react-vite';

import Dropdown from './Dropdown';

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        label: "New York",
        value: "NEW_YORK"
      },
      {
        label: "Canada",
        value: "CANADA"
      },
      {
        label: "Australia",
        value: "AUS"
      }
    ],
    children: <div>Check it here</div>,
    onChange: (option) => {
      console.log("option>>", option);
    }
  }
};