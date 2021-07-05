import React from "react";

import UISpinner from "./index";

export default {
    title: "Components/Core"
};

export const Spinner = (props: ISpinnerProps): JSX.Element => {
    return <UISpinner {...props} />;
};

Spinner.argTypes = {
    color: { control: { type: "color" } },
}

Spinner.args = {
    color: "",
}
