import { HashLink as Link } from "react-router-hash-link";
import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import QuestionCircle from "~/components/icons/QuestionCIrcle";
import scrollWithOffset from "~/helpers/scrollWithOffset";

import { HintButton, HintText, StyledDropdown } from "./styles";

const DefaultTrigger = ({ toggle, color }: IDropdownTriggerProps): JSX.Element => {
    return (
        <HintButton onClick={toggle}>
            <QuestionCircle width={18} height={23} color={color} />
        </HintButton>
    );
}

const DefaultItem = ({ text, extraText = "", linkUrl, linkText, background, color }: IHintItemProps): JSX.Element => {
    return (
        <HintText background={background} color={color}>
            {text}
            <ConditionalRender condition={!!linkUrl && !!linkText}>
                <Link to={linkUrl as string} scroll={(el) => scrollWithOffset(el, 20)}>
                    {linkText}
                </Link>
            </ConditionalRender>
            <ConditionalRender condition={!!extraText}>
                <div dangerouslySetInnerHTML={{ __html: extraText }} style={{ marginTop: "20px" }} />
            </ConditionalRender>
        </HintText>
    );
};

const Hint = ({ renderTrigger = DefaultTrigger, renderItem = DefaultItem, ...props }: IHintProps): JSX.Element => {
    const { className, tabIndex, text, linkUrl, linkText, background, color, toRight = false, extraText } = props;

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
            {() => renderItem({ text, linkUrl, linkText, background, color, extraText })}
        </StyledDropdown>
    );
};

export default Hint;
