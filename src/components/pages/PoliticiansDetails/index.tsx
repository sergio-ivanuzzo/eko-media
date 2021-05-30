import React from "react";
import { useIntl } from "react-intl";

import ConditionalRender from "~/components/core/ConditionalRender";
import FormattedTitle from "~/components/core/FormattedTitle";
import MentionChart from "~/components/charts/MentionChart";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";
import formatString from "~/helpers/formatString";
import useData from "~/hooks/useData";

import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { CATEGORIES_MAP, TYPES } from "~/common/constants";
import { LeftColumn, RightColumn, Section, SubSection } from "~/components/pages/styles";

const TYPE = TYPES.POLITICIAN;

const PoliticiansDetailsPage = (): JSX.Element => {
    const { data, selectedCategory } = useData();
    const { formatMessage } = useIntl();

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <>
                <Section>
                    <FormattedTitle
                        placeholder={formatMessage({ id: "politician_bar.title" })}
                        params={[ CATEGORIES_MAP[selectedCategory] ]} level={HeadingLevel.H2} />

                    <SubSection>
                        <LeftColumn>
                            <FormattedTitle
                                placeholder={formatMessage({ id: "orange_label" })}
                                params={[ formatString({
                                    initial: formatMessage({ id: "topX" }),
                                    params: [ "40" ]
                                }) ]} />
                            <PoliticianBar />
                        </LeftColumn>
                        <RightColumn>
                            <MentionChart />
                        </RightColumn>
                    </SubSection>
                </Section>
            </>
        </ConditionalRender>
    )
};

export default PoliticiansDetailsPage;
