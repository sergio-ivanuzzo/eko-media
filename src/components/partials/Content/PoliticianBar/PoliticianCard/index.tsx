import React from "react";
import { useIntl } from "react-intl";

import maybePluralize from "~/helpers/maybePluralize";

import { Mention } from "~/common/constants";
import MentionBar from "~/components/partials/Content/PoliticianBar/MentionBar";
import { StyledCard } from "~/components/partials/Content/PoliticianBar/PoliticianCard/styles";

const MESSAGE_CASES: [string, string, string] = [
    "pluralize.mention.first_case",
    "pluralize.mention.second_case",
    "pluralize.mention.third_case",
];

const PoliticianCard = ({ name, mentions, avatarUrl, ...props }: IPoliticianCardProps): JSX.Element => {
    const { formatMessage } = useIntl();
    const text = formatMessage({ id: maybePluralize(mentions[Mention.ALL], MESSAGE_CASES) });
    const { selectable, selected, onClick } = props;

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
        <StyledCard
            avatarUrl={avatarUrl}
            name={name}
            text={`${mentions[Mention.ALL]} ${text}`}
            append={renderMentionBar}
            selectable={selectable}
            selected={selected}
            onClick={onClick}
        />
    );
};

export default PoliticianCard;
