import React, { useEffect, useMemo, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";

import { DropdownContainer, Frame, FrameContainer, TriggerContainer } from "./styles";

const DefaultTrigger = ({ toggle, isOpen }: IDropdownTriggerProps): JSX.Element => {
    return (
        <TriggerContainer onClick={toggle}>
            <button>{isOpen}</button>
        </TriggerContainer>
    );
};

const Dropdown = ({ renderTrigger = DefaultTrigger, ...props }: IDropdownProps): JSX.Element => {
    const { onClose = () => null, className = "", children, tabIndex } = props;
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

    const listeners = useMemo(() => ({
        Escape: () => isActiveElement && handleClose(),
        Space: () => isActiveElement && toggle(),
    }), [ isActiveElement ]);

    useKeyboard(listeners, [ isActiveElement ])

    return (
        <DropdownContainer ref={dropdownRef} className={className} tabIndex={tabIndex}>
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
