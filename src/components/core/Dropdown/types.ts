export interface IDropdownTriggerProps {
    onClick: () => void;
    isOpen: boolean;
}

export interface IRenderDropdownChildrenProps {
    isOpen: boolean;
    close: () => void;
}

export interface IDropdownProps {
    renderTrigger?: <T extends IDropdownTriggerProps>(props: T) => JSX.Element;
    multiple?: boolean;
    children: (props: IRenderDropdownChildrenProps) => JSX.Element | JSX.Element[];
}
