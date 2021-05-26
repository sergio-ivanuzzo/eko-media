import React from "react";

import { AvatarContainer } from "~/components/core/Avatar/styles";

const Avatar = ({ src, offset = -50 }: IAvatarProps): JSX.Element => {
    return (
        <AvatarContainer offset={offset}>
            <img src={src} />
        </AvatarContainer>
    );
};

export default Avatar;
