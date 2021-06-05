declare interface IPoliticianBarProps {
    limit?: number;
    selectable?: boolean;
    onSelect?: (name: string) => void;
}

declare interface IPoliticianBarItem {
    name: string;
    mentions: { [key: string]: number };
    avatarUrl?: string;
}

declare interface IPoliticianCardProps extends IPoliticianBarItem, IStylableComponent {
    onClick?: () => void;
    selectable?: boolean;
    selected?: boolean;
}
