import React from "react";
import { Meta } from "@storybook/react";

import Header from "./index";

export default {
    title: "Components/Header"
};

export const SimpleHeader = (): JSX.Element => {
    return <Header />;
}