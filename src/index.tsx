import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import smoothScroll from "smoothscroll-polyfill";

import "normalize.css";

import App from "~/components";
import DataProvider from "~/providers/DataProvider";
import { GlobalStyle } from "~/components/global.styles";

import theme from "~/common/theme";
import translations from "~/i18n";

// in future we can add translations for multiple languages
const defaultLocale = "uk-UA";

smoothScroll.polyfill();

ReactDOM.render(
    <IntlProvider locale={defaultLocale} messages={translations[defaultLocale]}>
        <DataProvider>
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle />
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </>
            </ThemeProvider>
        </DataProvider>
    </IntlProvider>,
    document.getElementById("root")
);
