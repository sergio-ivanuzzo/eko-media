import { useIntl } from "react-intl";
import React, { useState } from "react";

import ArrowLeft from "~/components/icons/ArrowLeft";
import ConditionalRender from "~/components/core/ConditionalRender";
import FormattedTitle from "~/components/core/FormattedTitle";
import MentionChart from "~/components/charts/StackedBar/MentionChart";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";
import formatString from "~/helpers/formatString";
import useData from "~/hooks/useData";

import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { AlignItems, JustifyContent } from "~/components/global.constants";
import { BackLink, HeadingSection, LeftColumn, RightColumn, Section, SubSection } from "~/components/pages/styles";
import { CATEGORIES_MAP, TYPES } from "~/common/constants";

const TYPE = TYPES.POLITICIAN;

const PoliticiansDetailsPage = (): JSX.Element => {
    const { selectedCategory, isDataLoaded, getDataset  } = useData();
    const { formatMessage } = useIntl();
    const [ politicianName, setPoliticianName ] = useState<string>("");

    const dataset = getDataset(TYPE, selectedCategory) || [];

    return (
        <ConditionalRender condition={isDataLoaded}>
            <>
                <Section>
                    <HeadingSection>
                        <BackLink to="/" tabIndex={7}>
                            <ArrowLeft width={100} height={25} />
                        </BackLink>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "politician_bar.title" })}
                            params={[ CATEGORIES_MAP[selectedCategory] ]} level={HeadingLevel.H2} />
                    </HeadingSection>

                    <SubSection primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.START}>
                        <LeftColumn>
                            <div>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "orange_label" })}
                                    params={[ formatString({
                                        initial: formatMessage({ id: "topX" }),
                                        params: [ `${dataset.length}` ]
                                    }) ]} />
                            </div>
                            <PoliticianBar onSelect={setPoliticianName} selectable />
                        </LeftColumn>
                        <RightColumn primaryAlign={JustifyContent.END}>
                            <div>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "stacked_bar.politician.title" })}
                                    params={[ politicianName ]} level={HeadingLevel.H3} />
                            </div>

                            <MentionChart politicianName={politicianName} />
                        </RightColumn>
                    </SubSection>
                </Section>
            </>
        </ConditionalRender>
    )
};

export default PoliticiansDetailsPage;
