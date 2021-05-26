import React from "react";

import { MentionBarContainer, NegativeBar, NeutralBar, PositiveBar } from "./styles";

const MentionBar = ({ positive, neutral, negative }: IMentionBarProps): JSX.Element => {
    const all = positive + neutral + negative;

    const positiveValue = Math.ceil(positive / all * 100);
    const neutralValue = Math.ceil(neutral / all * 100);
    const negativeValue = Math.ceil(negative / all * 100);

    return (
        <MentionBarContainer>
            <PositiveBar value={positiveValue} />
            <NeutralBar value={neutralValue + positiveValue} />
            <NegativeBar value={negativeValue + neutralValue + positiveValue} />
        </MentionBarContainer>
    );
};

export default MentionBar;
