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

const DefaultItem = (): JSX.Element => {
    return (
        <HintText>
            Some text here !
        </HintText>
    );
};

const Hint = ({ renderTrigger = DefaultTrigger, renderItem = DefaultItem, ...props }: IHintProps): JSX.Element => {
    const { className, tabIndex } = props;

    return (
        <StyledDropdown className={className}
                  tabIndex={tabIndex}
                  renderTrigger={(props: IDropdownTriggerProps) => renderTrigger(props)}
        >
            {renderItem}
        </StyledDropdown>
    );
};

export default Hint;
