import React from "react";

import StoryRouter from "storybook-react-router";
import { storiesOf } from "@storybook/react";

import UIApp from "./index";

storiesOf("Components/Main", module)
    .addDecorator(StoryRouter() as any)
    .add("App", () => (
        <UIApp />
    ));
