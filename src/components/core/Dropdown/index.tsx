import React, { useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";

import { DropdownContainer, Frame, FrameContainer, TriggerContainer } from "./styles";
import { IDropdownProps, IDropdownTriggerProps } from "./types";

const DefaultTrigger = ({ toggle, isOpen }: IDropdownTriggerProps): JSX.Element => {
    return (
        <div onClick={toggle}>
            <button>{isOpen}</button>
        </div>
    );
};

const Dropdown = ({ renderTrigger = DefaultTrigger, children }: IDropdownProps): JSX.Element => {
    const [ isOpen, setOpen ] = useState(false);
    const [ dropdownRef, isActiveElement ] = useActiveElement<HTMLDivElement>();

    const toggle = () => setOpen(!isOpen);
    const close = () => setOpen(false);

    // handling close on click outside
    useEffect(() => {
        !isActiveElement && close();
    }, [ isActiveElement ]);

    // handle close on keyboard events
    useKeyboard({
        Esc: () => close(),
    })

    return (
        <DropdownContainer ref={dropdownRef}>
            <TriggerContainer>
                {renderTrigger({
                    toggle ,
                    isOpen,
                })}
            </TriggerContainer>
            <ConditionalRender condition={isOpen}>
                <FrameContainer>
                    <Frame>
                        {children({
                            close,
                            isOpen,
                        })}
                    </Frame>
                </FrameContainer>
            </ConditionalRender>
        </DropdownContainer>
    );
};

export default Dropdown;
