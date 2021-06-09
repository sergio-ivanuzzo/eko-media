import React from "react";

import UITooltip from "./index";

export default {
    title: "Components/Core"
};

export const Tooltip = (props: ITooltipProps): JSX.Element => {
    return (
        <UITooltip {...props}>
            <div style={{ textAlign: "center" }}>Hover</div>
        </UITooltip>
    );
};

Tooltip.argTypes = {
    text: { control: { type: "text" } },
    color: { control: { type: "color" } },
    backgroundColor: { control: { type: "color" } },
}

Tooltip.args = {
    text: "Tooltip message here!",
    color: "#ccc",
    backgroundColor: "white",
}
