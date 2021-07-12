import { Link } from "react-router-dom";
import React from "react";
import { useIntl } from "react-intl";

import FacebookIcon from "~/components/icons/FacebookIcon";
import Instagram from "~/components/icons/Instagram";
import TelegramIcon from "~/components/icons/TelegramIcon";
import TwitterIcon from "~/components/icons/TwitterIcon";
import Youtube from "~/components/icons/Youtube";

import useData from "~/hooks/useData";
import { Copyright, FooterContainer, LastUpdatedContainer, SocialButton, SocialContainer } from "./styles";

const Footer = (): JSX.Element => {
    const { lastUpdated } = useData();
    const { formatMessage } = useIntl();

    const month = lastUpdated?.toLocaleString("en-US", { month: "2-digit" });
    const year = lastUpdated?.getFullYear().toString();

    return (
        <FooterContainer>
            <LastUpdatedContainer>
                <span>
                    {formatMessage({ id: "footer.last_updated.label" })}
                </span>
                <span>
                    {`${month}-${year}`}
                </span>
            </LastUpdatedContainer>
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
                <SocialButton>
                    <Link to={{ pathname: "https://t.me/vox_ukraine" }} target="_blank">
                        <TelegramIcon width={48} />
                    </Link>
                </SocialButton>
                <SocialButton>
                    <Link to={{ pathname: "https://www.youtube.com/channel/UCR6MsnwJpQUJMYbef2vRbvw" }} target="_blank">
                        <Youtube width={48} />
                    </Link>
                </SocialButton>
                <SocialButton>
                    <Link to={{ pathname: "https://www.instagram.com/voxukraine/" }} target="_blank">
                        <Instagram width={48} />
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
