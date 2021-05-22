import React, { useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";

import { DropdownContainer, Frame, FrameContainer, TriggerContainer } from "./styles";

const DefaultTrigger = ({ toggle, isOpen }: IDropdownTriggerProps): JSX.Element => {
    return (
        <div onClick={toggle}>
            <button>{isOpen}</button>
        </div>
    );
};

const Dropdown = ({ renderTrigger = DefaultTrigger, children, onClose = () => null }: IDropdownProps): JSX.Element => {
    const [ isOpen, setOpen ] = useState(false);
    const [ dropdownRef, isActiveElement ] = useActiveElement<HTMLDivElement>();

    const toggle = () => setOpen(!isOpen);
    const close = () => setOpen(false);

    const handleClose = (): void => {
        close();
        onClose();
    };

    // handling close on click outside
    useEffect(() => {
        !isActiveElement && handleClose();
    }, [ isActiveElement ]);

    // handle close on keyboard events
    useKeyboard({
        Esc: () => handleClose(),
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
