declare interface IBubbleDataItem {
    category: string;
    word: string;
    wordCount: number;
    radius: number;
}

declare interface IUseBubbleProps {
    data: Array<IBubbleDataItem>;
    selectedCategories: string[];
}
