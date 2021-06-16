import { HashLink as Link } from "react-router-hash-link";
import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import QuestionCircle from "~/components/icons/QuestionCIrcle";

import { HintButton, HintText, StyledDropdown } from "./styles";

const DefaultTrigger = ({ toggle, color }: IDropdownTriggerProps): JSX.Element => {
    return (
        <HintButton onClick={toggle}>
            <QuestionCircle width={18} height={23} color={color} />
        </HintButton>
    );
}

const DefaultItem = ({ text, linkUrl, linkText, background, color }: IHintItemProps): JSX.Element => {
    const scrollWithOffset = (el: HTMLElement, offset: number) => {
        const elementPosition = el.offsetTop - offset;
        window.scroll({
            top: elementPosition,
            left: 0,
            behavior: "smooth"
        });
    };

    return (
        <HintText background={background} color={color}>
            {text}
            <ConditionalRender condition={!!linkUrl && !!linkText}>
                <Link to={linkUrl as string} scroll={(el) => scrollWithOffset(el, 20)}>
                    {linkText}
                </Link>
            </ConditionalRender>
        </HintText>
    );
};

const Hint = ({ renderTrigger = DefaultTrigger, renderItem = DefaultItem, ...props }: IHintProps): JSX.Element => {
    const { className, tabIndex, text, linkUrl, linkText, background, color, toRight = false } = props;

    return (
        <StyledDropdown
            className={className}
            tabIndex={tabIndex}
            renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({
                ...props,
                color,
            })}
            background={background}
            color={color}
            toRight={toRight}
        >
            {() => renderItem({ text, linkUrl, linkText, background, color })}
        </StyledDropdown>
    );
};

export default Hint;
