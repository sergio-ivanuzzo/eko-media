import React, { useEffect, useState } from "react";

import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";
import ConditionalRender from "~/components/core/ConditionalRender";

import { IDropdownProps, IRenderTriggerProps } from "./types";
import { DropdownContainer, TriggerContainer } from "./styles";

const defaultRender = ({ onClick, isOpen }: IRenderTriggerProps): React.ReactNode => {
    return (
        <div onClick={onClick}>
            <ConditionalRender condition={isOpen}>
                <div>Opened</div>
                <div>Closed</div>
            </ConditionalRender>
        </div>
    );
};

const Dropdown = ({ renderTrigger = defaultRender }: IDropdownProps): JSX.Element => {
    const [isOpen, setOpen] = useState(false);
    const [dropdownRef, isActiveElement] = useActiveElement<HTMLDivElement>();

    const close = () => setOpen(false);

    const defaultTriggerProps = {
        onClick: () => setOpen(!isOpen),
        isOpen,
    };

    // handling close on click outside
    useEffect(() => {
        !isActiveElement && setOpen(false);
    }, [isActiveElement]);

    // handle close on keyboard events
    useEffect(() => useKeyboard({
        Esc: () => close(),
    }), []);

    return (
        <DropdownContainer ref={dropdownRef}>
            <TriggerContainer>
                {renderTrigger(defaultTriggerProps)}
            </TriggerContainer>
        </DropdownContainer>
    );
};

export default Dropdown;
