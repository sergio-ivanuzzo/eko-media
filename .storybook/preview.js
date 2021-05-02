import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import DataProvider from "~/providers/DataProvider";

import theme from "~/common/theme";
import translations from "~/i18n";

// in future we can add translations for multiple languages
const defaultLocale = "uk-UA";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
      <IntlProvider locale={defaultLocale} messages={translations[defaultLocale]}>
        <DataProvider>
          <ThemeProvider theme={theme}>
            <Router>
                <Story />
            </Router>
          </ThemeProvider>
        </DataProvider>
      </IntlProvider>
  ),
];