import React, { useContext, useEffect } from "react";

import UIBar from "./index";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import { DataContext } from "~/providers/DataProvider";

export default {
    title: "Components/Partials/Charts"
};

export const Bar = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { data, loadAll } = useData();
    const { date } = useContext<IDataProviderContext<IItem>>(DataContext);

    useEffect(() => {
        (async (): Promise<void> => {
            await loadAll();
        })();
    }, [ date ]);

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <UIBar />
        </ConditionalRender>
    );
};
