import React from "react";
import ReactDOM from "react-dom";

import { IntlProvider } from "react-intl";

import App from "~/components/App";
import DataProvider from "~/providers/DataProvider";

ReactDOM.render(
    <IntlProvider locale="uk">
        <DataProvider>
            <App />
        </DataProvider>
    </IntlProvider>,
    document.getElementById("root")
);