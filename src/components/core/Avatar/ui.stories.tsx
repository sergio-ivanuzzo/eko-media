import React from "react";

import UIAvatar from "./index";

export default {
    title: "Components/Core"
};

export const Avatar = ({ src = "" }: IAvatarProps): JSX.Element => {
    return <UIAvatar src={src} />;
}

Avatar.argTypes = {
    src: { control: { type: "text" } },
}

Avatar.args = {
    src: "",
}
