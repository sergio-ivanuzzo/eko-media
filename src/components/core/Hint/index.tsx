import { HashLink as Link } from "react-router-hash-link";
import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import QuestionCircle from "~/components/icons/QuestionCIrcle";

import { HintButton, HintText, StyledDropdown } from "./styles";

const DefaultTrigger = ({ toggle }: IDropdownTriggerProps): JSX.Element => {
    return (
        <HintButton onClick={toggle}>
            <QuestionCircle width={18} height={23} />
        </HintButton>
    );
}

const DefaultItem = ({ text, linkUrl, linkText }: IHintItemProps): JSX.Element => {
    const scrollWithOffset = (el: HTMLElement, offset: number) => {
        const elementPosition = el.offsetTop - offset;
        window.scroll({
            top: elementPosition,
            left: 0,
            behavior: "smooth"
        });
    };

    return (
        <HintText>
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
    const { className, tabIndex, text, linkUrl, linkText } = props;

    return (
        <StyledDropdown className={className}
                  tabIndex={tabIndex}
                  renderTrigger={(props: IDropdownTriggerProps) => renderTrigger(props)}
        >
            {() => renderItem({ text, linkUrl, linkText })}
        </StyledDropdown>
    );
};

export default Hint;
