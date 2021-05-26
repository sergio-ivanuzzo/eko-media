import React from "react";

import Avatar from "~/components/core/Avatar";
import { CardContainer, Name } from "./styles";

const DefaultText = ({ text }: ICardTextProps): JSX.Element => {
    return (
        <div>{text}</div>
    );
};

const Card = ({ avatarUrl, name, text, renderText = DefaultText, append = () => <></> }: ICardProps): JSX.Element => {
    return (
        <CardContainer>
            <Avatar src={avatarUrl} />
            <Name>{name}</Name>
            {renderText({ text })}
            {append()}
        </CardContainer>
    );
};

export default Card;
