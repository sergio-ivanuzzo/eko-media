import React from "react";
import { useIntl } from "react-intl";

import Card from "~/components/core/Card";
import maybePluralize from "~/helpers/maybePluralize";

import { Mention } from "~/common/constants";
import MentionBar from "~/components/partials/Content/PoliticianBar/MentionBar";

const MESSAGE_CASES: [string, string, string] = [
    "pluralize.mention.first_case",
    "pluralize.mention.second_case",
    "pluralize.mention.third_case",
];

const PoliticianCard = ({ name, mentions, avatarUrl }: IPoliticianBarItem): JSX.Element => {
    const { formatMessage } = useIntl();
    const text = formatMessage({ id: maybePluralize(mentions[Mention.ALL], MESSAGE_CASES) });

    const renderMentionBar = () => {
        return (
            <MentionBar
                positive={mentions[Mention.POSITIVE]}
                neutral={mentions[Mention.NEUTRAL]}
                negative={mentions[Mention.NEGATIVE]}
            />
        );
    };

    return (
        <Card avatarUrl={avatarUrl}
              name={name}
              text={`${mentions[Mention.ALL]} ${text}`}
              append={renderMentionBar} />
    );
};

export default PoliticianCard;
