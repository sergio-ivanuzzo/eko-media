import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";

import App from "~/components";
import DataProvider from "~/providers/DataProvider";
import { GlobalStyle } from "~/components/global.styles";

import theme from "~/common/theme";
import translations from "~/i18n";

// in future we can add translations for multiple languages
const defaultLocale = "uk-UA";

ReactDOM.render(
    <IntlProvider locale={defaultLocale} messages={translations[defaultLocale]}>
        <DataProvider>
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle />
                    <Router>
                        <App />
                    </Router>
                </>
            </ThemeProvider>
        </DataProvider>
    </IntlProvider>,
    document.getElementById("root")
);
