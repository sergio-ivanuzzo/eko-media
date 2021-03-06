import React, { useContext, useEffect } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import UIPoliticianBar from "./index";
import useData from "~/hooks/useData";

import { DataContext } from "~/providers/DataProvider";
import { MOCK_DATE } from "~/common/constants";

export default {
    title: "Components/Partials/Content"
};


export const PoliticianBar = (): JSX.Element => {
    const { isDataLoading, loadAll } = useData();
    const { date, setDate } = useContext<IDataProviderContext<IItem>>(DataContext);

    useEffect(() => {
        setDate(MOCK_DATE);
    }, []);

    useEffect(() => {
        if (date.getTime() === MOCK_DATE.getTime()) {
            (async (): Promise<void> => {
                await loadAll();
            })();
        }
    }, [ date ]);

    return (
        <ConditionalRender condition={!isDataLoading}>
            <UIPoliticianBar />
        </ConditionalRender>
    );
};
