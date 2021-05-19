export interface IReferenceBarProps {
    items: IReferenceItem[];
}

export interface IReferenceItem {
    from: string;
    to: string;
    direction: ReferenceDirection;
    referenceCount: number;
}

export type IReferenceItemProps = IReferenceItem;

export enum ReferenceDirection {
    FORWARD = 0,
    BACK = 1
}
