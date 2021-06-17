import React from "react";

import Avatar from "~/components/core/Avatar";
import { CardContainer, CardText, Name } from "./styles";

const DEFAULT_WIDTH = 150;

const DefaultText = ({ text }: ICardTextProps): JSX.Element => {
    return (
        <CardText>{text}</CardText>
    );
};

const Card = (props: ICardProps): JSX.Element => {
    const {
        avatarUrl,
        name,
        text,
        renderText = DefaultText,
        append = () => <></>,
        className = "",
        onClick = () => null,
        width = DEFAULT_WIDTH,
    } = props;

    return (
        <CardContainer className={className} onClick={onClick} width={width}>
            <Avatar src={avatarUrl} />
            <Name>{name}</Name>
            {renderText({ text })}
            {append()}
        </CardContainer>
    );
};

export default Card;
