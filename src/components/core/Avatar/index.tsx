import React from "react";

import { AvatarContainer } from "~/components/core/Avatar/styles";

const Avatar = ({ src }: IAvatarProps): JSX.Element => {
    // keep alt empty to hide broken image if there no image by src
    // https://stackoverflow.com/a/12121931/5397119
    return (
        <AvatarContainer>
            <img src={src} alt="" />
        </AvatarContainer>
    );
};

export default Avatar;
