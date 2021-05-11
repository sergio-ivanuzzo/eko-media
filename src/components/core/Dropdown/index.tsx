import React, { useEffect, useState } from "react";

import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";

import { DropdownContainer, TriggerContainer } from "./styles";
import { IDropdownProps, IDropdownTriggerProps } from "./types";

const DefaultTrigger = ({ onClick, isOpen }: IDropdownTriggerProps): JSX.Element => {
    return (
        <div onClick={onClick}>
            <button>{isOpen}</button>
        </div>
    );
};

const Dropdown = ({ renderTrigger = DefaultTrigger, children }: IDropdownProps): JSX.Element => {
    const [ isOpen, setOpen ] = useState(false);
    const [ dropdownRef, isActiveElement ] = useActiveElement<HTMLDivElement>();

    const close = () => setOpen(false);

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
                {renderTrigger({
                    onClick: () => setOpen(!isOpen),
                    isOpen,
                })}
            </TriggerContainer>
            {children}
        </DropdownContainer>
    );
};

export default Dropdown;
