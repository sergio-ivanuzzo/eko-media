import React from "react";

import QuestionCircle from "~/components/icons/QuestionCIrcle";

import { HintButton, HintText, StyledDropdown } from "./styles";

const DefaultTrigger = ({ toggle }: IDropdownTriggerProps): JSX.Element => {
    return (
        <HintButton onClick={toggle}>
            <QuestionCircle width={18} height={23} />
        </HintButton>
    );
}

const DefaultItem = ({ text }: IHintItemProps): JSX.Element => {
    return (
        <HintText>
            {text}
        </HintText>
    );
};

const Hint = ({ renderTrigger = DefaultTrigger, renderItem = DefaultItem, ...props }: IHintProps): JSX.Element => {
    const { className, tabIndex, text } = props;

    return (
        <StyledDropdown className={className}
                  tabIndex={tabIndex}
                  renderTrigger={(props: IDropdownTriggerProps) => renderTrigger(props)}
        >
            {() => renderItem({ text })}
        </StyledDropdown>
    );
};

export default Hint;
