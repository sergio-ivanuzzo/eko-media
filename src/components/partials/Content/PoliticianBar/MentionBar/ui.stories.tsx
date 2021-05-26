import React from "react";

import UIMentionBar from "./index";

export default {
    title: "Components/Partials/Content"
};

export const MentionBar = (props: IMentionBarProps): JSX.Element => {
    return <UIMentionBar {...props} />;
}

MentionBar.argTypes = {
    positive: { control: { type: "number" } },
    neutral: { control: { type: "number" } },
    negative: { control: { type: "number" } },
}

MentionBar.args = {
    positive: 50,
    neutral: 40,
    negative: 10,
}
