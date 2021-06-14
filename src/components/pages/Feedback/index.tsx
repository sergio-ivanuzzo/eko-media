import React from "react";

import { Section } from "~/components/pages/styles";

import { Text } from "./styles";

const FeedbackPage = (): JSX.Element => {
    return (
        <Section>
            <Text>
                Зворотній зв’язок:
                <a href="https://forms.gle/cFnnQG6NzMtZoftW8" target="_blank">https://forms.gle/cFnnQG6NzMtZoftW8</a>
            </Text>
        </Section>
    );
};

export default FeedbackPage;
