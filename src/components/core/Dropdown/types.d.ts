declare interface IDropdownTriggerProps {
    toggle: () => void;
    isOpen: boolean;
}

declare interface IRenderDropdownChildrenProps {
    isOpen: boolean;
    close: () => void;
}

declare interface IDropdownProps {
    renderTrigger?: <T extends IDropdownTriggerProps>(props: T) => JSX.Element;
    multiple?: boolean;
    children: (props: IRenderDropdownChildrenProps) => JSX.Element | JSX.Element[];
}
