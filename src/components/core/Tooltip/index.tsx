import React, { useEffect, useState } from "react";

import useElementSize from "~/hooks/useElementSize";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

export enum DIRECTION {
    TO_BOTTOM = "to bottom",
    TO_TOP = "to top"
}

import { StyledDropdown, TooltipContainer } from "./styles";

const DefaultTrigger = ({ toggle, children }: ITooltipTriggerProps): JSX.Element => {
    return (
        <div onMouseEnter={() => toggle()} onMouseLeave={() => toggle()}>
            {children}
        </div>
    );
};

const DefaultItem = ({ text, ...props }: ITooltipContainerProps): JSX.Element => {
    return (
        <TooltipContainer {...props}>
            {text}
        </TooltipContainer>
    )
};

const Tooltip = (props: ITooltipProps): JSX.Element => {
    const {
        text,
        backgroundColor = "transparent",
        color = "transparent",
        renderTrigger = DefaultTrigger,
        renderItem = DefaultItem,
        children
    } = props;

    const [ tooltipRef, entry ] = useIntersectionObserver<HTMLDivElement>({ rootMargin: "0px" });
    const { ref, height } = useElementSize(tooltipRef);
    const [ direction, setDirection ] = useState(DIRECTION.TO_BOTTOM);

    const renderChildren = () => {
        return renderItem({ text, color, backgroundColor, direction: direction });
    }

    useEffect(() => {
        if (!entry.isIntersecting) {
            // handling vertical re-position
            if ((entry.boundingClientRect?.top || 0) - height < 0) {
                setDirection(DIRECTION.TO_TOP);
            } else {
                setDirection(DIRECTION.TO_BOTTOM);
            }
        }
    }, [ entry, height ]);

    return (
        <StyledDropdown
            ref={ref}
            renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({ children, ...props })}
        >
            {renderChildren}
        </StyledDropdown>
    );
};

export default Tooltip;
