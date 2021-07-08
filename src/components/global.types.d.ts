declare interface ISelectableComponent {
    tabIndex?: number;
}

// https://stackoverflow.com/a/54113434/5397119
declare interface IStylableComponent {
    className?: string;
}

declare interface IActivableComponent {
    isActive?: boolean;
}

declare interface IReferencableComponent<T extends HTMLElement | null> {
    ref?: React.RefObject<T>;
}

declare interface IDisableableComponent {
    disabled?: boolean;
}
