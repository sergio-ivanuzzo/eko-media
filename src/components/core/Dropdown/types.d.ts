declare interface IDropdownTriggerProps {
    toggle: () => void;
    isOpen: boolean;
}

declare interface IRenderDropdownChildrenProps {
    isOpen: boolean;
    close: () => void;
}

declare interface IDropdownProps extends ISelectableComponent, IStylableComponent {
    renderTrigger?: <T extends IDropdownTriggerProps>(props: T) => JSX.Element;
    multiple?: boolean;
    children: (props: IRenderDropdownChildrenProps) => JSX.Element | JSX.Element[];
    onClose?: () => void;
}
