declare interface ITooltipProps {
    text: string;
    backgroundColor?: string;
    color?: string;
    renderTrigger?: (props: ITooltipTriggerProps) => JSX.Element;
    renderItem?: (props: ITooltipContainerProps) => JSX.Element;
    children: JSX.Element;
}

declare interface ITooltipTriggerProps extends IDropdownTriggerProps {
    children: JSX.Element;
}

declare interface ITooltipContainerProps {
    text: string;
    backgroundColor?: string;
    color?: string;
    direction: string;
}
