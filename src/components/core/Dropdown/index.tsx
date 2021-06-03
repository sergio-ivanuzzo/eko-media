import React, { RefObject, useCallback, useEffect, useMemo, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useActiveElement from "~/hooks/useActiveElement";
import useKeyboard from "~/hooks/useKeyboard";
import useScrollTo from "~/hooks/useScrollTo";

import { DropdownContainer, Frame, FrameContainer, TriggerContainer } from "./styles";

const NAVIGATE_START_POSITION = 0;
// we will jump to first element (index eq 0) on open (see useEffect below)
const NAVIGATE_INITIAL = -1;

const DefaultTrigger = ({ toggle, isOpen }: IDropdownTriggerProps): JSX.Element => {
    return (
        <TriggerContainer onClick={toggle}>
            <button>{isOpen}</button>
        </TriggerContainer>
    );
};

const Dropdown = React.forwardRef((props: IDropdownProps<HTMLDivElement>, externalRef): JSX.Element => {
    const {
        renderTrigger = DefaultTrigger,
        onOpen = () => null,
        onClose = () => null,
        // we need this to detect from outside if dropdown cannot be opened
        // for example when no dropdown children to show (see Select component)
        blockOpening = false,
        // navigation
        onNavigate = () => null,
        // select navigated
        onPick = () => null,
        navigateMinIndex = NAVIGATE_START_POSITION,
        navigateFrom = NAVIGATE_START_POSITION,
        navigable = false,
        navigateMaxIndex = 0,
        allowCircularNavigation = false,
        // misc
        className = "",
        tabIndex,
        children: renderChildren,
    } = props;

    const [ isOpen, setOpen ] = useState(false);
    const toggle = () => !blockOpening && setOpen(!isOpen);
    const close = () => !blockOpening && setOpen(false);
    const handleClose = (): void => {
        close();
        onClose();
    };

    const [ navigationIndex, setNavigationIndex ] = useState(NAVIGATE_INITIAL);

    const navigate = useCallback((index: number) => {
        if (navigateMinIndex === navigateMaxIndex) {
            return;
        }

        let validIndex = index;
        if (validIndex < navigateMinIndex) {
            if (allowCircularNavigation) {
                validIndex = navigateMaxIndex;
            } else {
                validIndex = NAVIGATE_START_POSITION;
            }
        } else if (validIndex > navigateMaxIndex) {
            if (allowCircularNavigation) {
                validIndex = NAVIGATE_START_POSITION;
            } else {
                validIndex = navigateMaxIndex;
            }
        }

        setNavigationIndex(validIndex);
        onNavigate(validIndex);
    }, [ allowCircularNavigation, navigateMinIndex, navigateMaxIndex ]);

    const handlePick = useCallback((): void => {
        onPick(navigationIndex);
    }, [ navigationIndex ]);

    const [ dropdownRef, isActiveElement ] = useActiveElement<HTMLDivElement>(externalRef as RefObject<HTMLDivElement>);

    const listenersMap = useMemo(() => {
        let listeners = {};

        if (isActiveElement) {
            listeners = {
                ...listeners,
                Escape: () => isActiveElement && handleClose(),
                Space: () => isActiveElement && toggle(),
            }

            if (isOpen && navigable) {
                listeners = {
                    ...listeners,
                    ArrowDown: () => navigate(navigationIndex + 1),
                    ArrowUp: () => navigate(navigationIndex - 1),
                    Enter: () => handlePick()
                }
            }
        }

        return listeners;

    }, [ isActiveElement, isOpen, navigable, navigationIndex ]);
    useKeyboard(listenersMap, [ isActiveElement, listenersMap ]);

    // handling close on click outside
    useEffect(() => {
        !isActiveElement && handleClose();
    }, [ isActiveElement ]);

    useEffect(() => {
        if (!blockOpening) {
            setNavigationIndex(isOpen ? navigateFrom : NAVIGATE_INITIAL);
            onOpen(isOpen);
        }
    }, [ isOpen, blockOpening ]);

    const [ frameRef ] = useScrollTo<HTMLDivElement>({ childIndex: navigationIndex });

    return (
        <DropdownContainer ref={dropdownRef} className={className} tabIndex={tabIndex}>
            <TriggerContainer>
                {renderTrigger({
                    toggle,
                    isOpen,
                })}
            </TriggerContainer>
            <ConditionalRender condition={isOpen}>
                <FrameContainer>
                    <Frame ref={frameRef}>
                        {renderChildren({
                            close,
                            isOpen,
                        })}
                    </Frame>
                </FrameContainer>
            </ConditionalRender>
        </DropdownContainer>
    );
});

export default Dropdown;
