declare interface IDropdownTriggerProps {
    toggle: () => void;
    isOpen: boolean;
}

declare interface IRenderDropdownChildrenProps {
    isOpen: boolean;
    close: () => void;
}

declare interface IDropdownProps<T extends HTMLElement>
    extends ISelectableComponent, IStylableComponent, IReferencableComponent<T> {
        children: (props: IRenderDropdownChildrenProps) => JSX.Element | JSX.Element[];
        renderTrigger?: <D extends IDropdownTriggerProps>(props: D) => JSX.Element;
        multiple?: boolean;
        onOpen?: (isOpen: boolean) => void;
        onClose?: () => void;
        navigable?: boolean;
        onNavigate?: (index: number) => void;
        onPick?: (index: number, close: () => void) => void;
        navigateFrom?: number;
        navigationOffset?: number;
        navigateMinIndex?: number;
        navigateMaxIndex?: number;
        allowCircularNavigation?: boolean;
        blockOpening?: boolean;
    }
