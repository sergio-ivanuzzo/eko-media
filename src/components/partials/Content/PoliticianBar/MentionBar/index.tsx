import React from "react";

import Tooltip from "~/components/core/Tooltip";

import { Mention } from "~/common/constants";
import {
    MentionBarContainer,
    NegativeBar,
    NegativeContainer,
    NeutralBar,
    NeutralContainer,
    PositiveBar,
    PositiveContainer,
} from "./styles";

import theme from "~/common/theme";

const { green, gray, orange, white, black } = theme.palette;

const MentionBar = ({ positive, neutral, negative, hoverable = true }: IMentionBarProps): JSX.Element => {
    const all = positive + neutral + negative;

    const positiveValue = Math.ceil(positive / all * 100);
    const neutralValue = Math.ceil(neutral / all * 100);
    const negativeValue = Math.ceil(negative / all * 100);

    const positiveBarValue = positiveValue;
    const neutralBarValue = positiveValue + neutralValue;
    const negativeBarValue = positiveValue + neutralValue + negativeValue;

    const positiveBarText = `${Mention.POSITIVE} ${positiveBarValue}`;
    const neutralBarText = `${Mention.NEUTRAL} ${neutralBarValue}`;
    const negativeBarText = `${Mention.NEGATIVE} ${negativeBarValue}`;

    return (
        <MentionBarContainer>
            <PositiveContainer value={positiveBarValue}>
                <Tooltip
                    text={positiveBarText}
                    backgroundColor={green.salad}
                    color={black.base}
                    hoverable={hoverable}
                >
                    <PositiveBar value={positiveBarValue}/>
                </Tooltip>
            </PositiveContainer>
            <NeutralContainer value={neutralBarValue}>
                <Tooltip
                    text={neutralBarText}
                    backgroundColor={gray.silver}
                    color={white.base}
                    hoverable={hoverable}
                >
                    <NeutralBar value={neutralBarValue}/>
                </Tooltip>
            </NeutralContainer>
            <NegativeContainer value={negativeBarValue}>
                <Tooltip
                    text={negativeBarText}
                    backgroundColor={orange.carrot}
                    color={white.base}
                    hoverable={hoverable}
                >
                    <NegativeBar value={negativeBarValue}/>
                </Tooltip>
            </NegativeContainer>
        </MentionBarContainer>
    );
};

export default MentionBar;
