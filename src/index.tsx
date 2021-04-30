import React from "react";
import ReactDOM from "react-dom";

import { IntlProvider } from "react-intl";

import App from "~/components/App";

ReactDOM.render(
    <IntlProvider locale="uk">
        <App />
    </IntlProvider>,
    document.getElementById("root")
);