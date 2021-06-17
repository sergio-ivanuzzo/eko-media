declare interface IReferenceBarProps {
    items: IReferenceItem[];
    setSelectedNodeName: (name: string) => void;
    setHoveredNodeName: (name: string) => void;
    setConnection: (from: string, to: string) => void;
}

declare interface IReferenceItem {
    from: string;
    to: string;
    direction: ReferenceDirection;
    referenceCount: number;
}

declare interface IReferenceItemProps extends IReferenceItem {
    setSelectedNodeName: (name: string) => void;
    setHoveredNodeName: (name: string) => void;
    setConnection: (from: string, to: string) => void;
}
