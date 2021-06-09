import React, { useState } from "react";

import useElementSize from "~/hooks/useElementSize";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

export enum DIRECTION {
    TO_BOTTOM = "to bottom",
    TO_TOP = "to top"
}

import { StyledDropdown, TooltipContainer } from "./styles";

const DefaultTrigger = ({ open, close, hoverable = true, setOffset, children }: ITooltipTriggerProps): JSX.Element => {
    return (
        <div
            onMouseEnter={() => hoverable && open()}
            onMouseLeave={() => hoverable && close()}
            onMouseMove={({  nativeEvent }) => {
                const { offsetX, offsetY } = nativeEvent;
                setOffset({
                    offsetX: offsetX - 50,
                    offsetY: offsetY + 5,
                });
            }}
        >
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
        hoverable = true,
        children
    } = props;

    const [ tooltipRef, entry ] = useIntersectionObserver<HTMLDivElement>({ rootMargin: "0px" });
    const { ref, height } = useElementSize(tooltipRef);
    const [ direction, setDirection ] = useState(DIRECTION.TO_BOTTOM);
    const [ offset, setOffset ] = useState<{ offsetX: number, offsetY: number }>({
        offsetX: 0,
        offsetY: 0,
    });

    const renderChildren = () => {
        return renderItem({ text, color, ...offset, backgroundColor, direction });
    }

    // useEffect(() => {
    //     if (!entry.isIntersecting) {
    //         // handling vertical re-position
    //         if ((entry.boundingClientRect?.top || 0) - height < 0) {
    //             setDirection(DIRECTION.TO_BOTTOM);
    //         } else {
    //             setDirection(DIRECTION.TO_TOP);
    //         }
    //     }
    // }, [ entry, height ]);

    return (
        <StyledDropdown
            ref={ref}
            {...offset}
            renderTrigger={
                (props: IDropdownTriggerProps) => renderTrigger({ children, setOffset, hoverable, ...props })
            }
        >
            {renderChildren}
        </StyledDropdown>
    );
};

export default Tooltip;
