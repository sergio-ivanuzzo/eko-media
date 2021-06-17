import { Link } from "react-router-dom";
import React from "react";

import FacebookIcon from "~/components/icons/FacebookIcon";
import TwitterIcon from "~/components/icons/TwitterIcon";

import { Copyright, FooterContainer, SocialButton, SocialContainer } from "./styles";

const Footer = (): JSX.Element => {
    return (
        <FooterContainer>
            <SocialContainer>
                <SocialButton>
                    <Link to={{ pathname: "https://www.facebook.com/VoxUkraine.Ukranian" }} target="_blank">
                        <FacebookIcon width={48} />
                    </Link>
                </SocialButton>
                <SocialButton>
                    <Link to={{ pathname: "https://twitter.com/Vox_UA?s=09" }} target="_blank">
                        <TwitterIcon width={48} />
                    </Link>
                </SocialButton>
            </SocialContainer>
            <Copyright>
                Developed by Sergio.Ivanuzzo&#64;gmail.com 2021
            </Copyright>
        </FooterContainer>
    );
};

export default Footer;
