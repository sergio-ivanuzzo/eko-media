import React from "react";

import FacebookIcon from "~/components/icons/FacebookIcon";
import TwitterIcon from "~/components/icons/TwitterIcon";

import { Copyright, FooterContainer, SocialButton, SocialContainer } from "./styles";

const Footer = (): JSX.Element => {
    return (
        <FooterContainer>
            <SocialContainer>
                <SocialButton>
                    <FacebookIcon width={48} />
                </SocialButton>
                <SocialButton>
                    <TwitterIcon width={48} />
                </SocialButton>
            </SocialContainer>
            <Copyright>
                Developed by Sergio.Ivanuzzo&#64;gmail.com 2021
            </Copyright>
        </FooterContainer>
    );
};

export default Footer;
