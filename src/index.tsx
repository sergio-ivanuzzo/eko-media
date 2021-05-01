import React from "react";
import ReactDOM from "react-dom";

import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";

import App from "~/components/App";
import DataProvider from "~/providers/DataProvider";

import theme from "~/common/theme";
import translations from "~/i18n";

// in future we can add translations for multiple languages
const defaultLocale = "uk-UA";

ReactDOM.render(
    <IntlProvider locale={defaultLocale} messages={translations[defaultLocale]}>
        <DataProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </DataProvider>
    </IntlProvider>,
    document.getElementById("root")
);
