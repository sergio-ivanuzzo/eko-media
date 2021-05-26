import React from "react";

import UIAvatar from "./index";

export default {
    title: "Components/Core"
};

export const Avatar = (props: IAvatarProps): JSX.Element => {
    return <UIAvatar {...props} />;
}

Avatar.argTypes = {
    src: { control: { type: "text" } },
    offset: { control: { type: "number" } },
}

Avatar.args = {
    src: "",
    offset: -50,
}
