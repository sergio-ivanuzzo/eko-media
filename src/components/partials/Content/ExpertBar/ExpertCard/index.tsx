import React from "react";
import { useIntl } from "react-intl";

import Card from "~/components/core/Card";
import maybePluralize from "~/helpers/maybePluralize";

const MESSAGE_CASES: [string, string, string] = [
    "pluralize.comment.first_case",
    "pluralize.comment.second_case",
    "pluralize.comment.third_case",
];

const ExpertCard = ({ name, commentsAmount = 0, avatarUrl, width }: IExpertCardProps): JSX.Element => {
    const { formatMessage } = useIntl();

    const text = formatMessage({ id: maybePluralize(commentsAmount, MESSAGE_CASES) });

    return (
        <Card avatarUrl={avatarUrl}
              name={name}
              text={`${commentsAmount} ${text}`}
              width={width}
        />
    );
};

export default ExpertCard;
