import React from "react";

import UIPoliticianCard from "./index";

import { Mention } from "~/common/constants";


export default {
    title: "Components/Partials/Content"
};

export const PoliticianCard = ({ name }: IPoliticianBarItem): JSX.Element => {
    const mentions = { [Mention.POSITIVE]: 1000, [Mention.NEUTRAL]: 100, [Mention.NEGATIVE]: 10, [Mention.ALL]: 1110 }
    return <UIPoliticianCard name={name} mentions={mentions} />;
}

PoliticianCard.argTypes = {
    name: { control: { type: "text" } },
}

PoliticianCard.args = {
    name: "Test",
}
