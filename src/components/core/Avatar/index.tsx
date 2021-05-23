import React from "react";

import { AvatarContainer } from "~/components/core/Avatar/styles";

const Avatar = ({ src }: IAvatarProps): JSX.Element => {
    return (
        <AvatarContainer>
            <img src={src} />
        </AvatarContainer>
    );
};

export default Avatar;
