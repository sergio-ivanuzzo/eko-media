declare interface IPoliticianBarProps {
    limit?: number;
}

declare interface IPoliticianBarItem {
    name: string;
    mentions: { [key: string]: number };
    avatarUrl?: string;
}
