export interface IBubbleDataItem {
    category: string;
    word: string;
    wordCount: number;
    radius: number;
}

export interface IUseBubbleProps {
    data: Array<IBubbleDataItem>;
    filteredCategories: string[];
}
