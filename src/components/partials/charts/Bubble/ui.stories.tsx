import React, { useContext, useEffect } from "react";

import UIBubble from "./index";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import { DataContext } from "~/providers/DataProvider";
import { MOCK_DATE } from "~/common/constants";

export default {
    title: "Components/Partials/Charts"
};

export const Bubble = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { data, loadAll } = useData();
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
        <ConditionalRender condition={!!Object.keys(data).length}>
            <UIBubble />
        </ConditionalRender>
    );
};
