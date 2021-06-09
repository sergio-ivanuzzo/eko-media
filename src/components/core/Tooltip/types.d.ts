declare interface ITooltipProps {
    text: string;
    backgroundColor?: string;
    color?: string;
    renderTrigger?: (props: ITooltipTriggerProps) => JSX.Element;
    renderItem?: (props: ITooltipContainerProps) => JSX.Element;
    hoverable?: boolean;
    children: JSX.Element;
}

declare interface ITooltipTriggerProps extends IDropdownTriggerProps {
    setOffset: ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) => void;
    hoverable?: boolean;
    children: JSX.Element;
}

declare interface ITooltipContainerProps {
    text: string;
    backgroundColor?: string;
    color?: string;
    direction: string;
    offsetX: number;
    offsetY: number;
}
