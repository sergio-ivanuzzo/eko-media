import React from "react";

import UICard from "./index";

export default {
    title: "Components/Core"
};

export const Card = (props: ICardProps): JSX.Element => {
    return <UICard {...props} />;
}

Card.argTypes = {
    avatarUrl: { control: { type: "text" } },
    name: { control: { type: "text" } },
    text: { control: { type: "text" } },
}

Card.args = {
    avatarUrl: "",
    name: "Test Username",
    text: "12345 comments",
}
