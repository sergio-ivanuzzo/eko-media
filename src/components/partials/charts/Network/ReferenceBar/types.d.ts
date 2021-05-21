declare interface IReferenceBarProps {
    items: IReferenceItem[];
}

declare interface IReferenceItem {
    from: string;
    to: string;
    direction: ReferenceDirection;
    referenceCount: number;
}

declare type IReferenceItemProps = IReferenceItem;

declare const enum ReferenceDirection {
    FORWARD = 0,
    BACK = 1
}
