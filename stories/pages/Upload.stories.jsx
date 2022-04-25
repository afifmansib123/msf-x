import React from "react";
import Upload from "../../pages/msf/upload";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";

export default {
    title: "Upload",
    component: Upload,
};

const queryClient = new QueryClient();
const Template = (args) => (
    <QueryClientProvider client={queryClient}>
        <Upload {...args} />
    </QueryClientProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
