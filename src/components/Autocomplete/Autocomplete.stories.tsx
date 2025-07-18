import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from './Autocomplete';

const meta = {
    component: Autocomplete,
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        url: "https://demo.dataverse.org/api/search",
        onSelect: function (option) {
            console.log({
                option
            });
        }
    }
};
