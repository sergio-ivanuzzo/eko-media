import React from "react";

import Header from "./index";

export default {
    title: "Components/Header"
};

export const SimpleHeader = (): JSX.Element => {
    console.log(Header);
    return <Header />;
}
