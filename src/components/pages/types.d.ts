declare interface IRowProps {
    // https://stackoverflow.com/a/51114250/5397119
    primaryAlign?: import("~/components/global.constants").JustifyContent;
    secondaryAlign?: import("~/components/global.constants").AlignItems;
    wrap?: boolean;
}

declare interface IColumnProps {
    // https://stackoverflow.com/a/51114250/5397119
    primaryAlign?: import("~/components/global.constants").JustifyContent;
    secondaryAlign?: import("~/components/global.constants").AlignItems;
}

declare interface IHeadingSectionProps {
    noMargin?: boolean;
}

declare interface ISectionProps {
    allowSelection?: boolean;
}
