import React, { useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";

import { DropdownContainer, TriggerContainer } from "./styles";
import { IDropdownProps, IRenderTriggerProps } from "./types";

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
    const [ isOpen, setOpen ] = useState(false);
    const [ dropdownRef, isActiveElement ] = useActiveElement<HTMLDivElement>();

    const close = () => setOpen(false);

    const defaultTriggerProps = {
        onClick: () => setOpen(!isOpen),
        isOpen,
    };

    // handling close on click outside
    useEffect(() => {
        !isActiveElement && setOpen(false);
    }, [ isActiveElement ]);

    // handle close on keyboard events
    useKeyboard({
        Esc: () => close(),
    })

    return (
        <DropdownContainer ref={dropdownRef}>
            <TriggerContainer>
                {renderTrigger(defaultTriggerProps)}
            </TriggerContainer>
        </DropdownContainer>
    );
};

export default Dropdown;
