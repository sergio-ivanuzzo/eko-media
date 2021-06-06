declare interface IPlaceholderProps extends IStylableComponent {
    children: JSX.Element;
    // https://stackoverflow.com/a/51114250/5397119
    primaryAlign?: import("~/components/global.constants").JustifyContent;
    secondaryAlign?: import("~/components/global.constants").AlignItems;
}
