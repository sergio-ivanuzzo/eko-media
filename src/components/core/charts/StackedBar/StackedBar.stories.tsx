import React, { useContext, useEffect } from "react";

import useData from "~/hooks/useData";

import { DataContext } from "~/providers/DataProvider";
import { IDataProviderContext } from "~/providers/DataProvider/types";
import StackedBar from "./index";

export default {
    title: "Components/Charts/StackedBar"
};

export const SimpleStackedBar = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { loadAll } = useData();
    const { date } = useContext<IDataProviderContext>(DataContext);

    useEffect(() => {
        (async (): Promise<void> => {
            await loadAll();
        })();
    }, [ date ]);

    return <StackedBar />;
};
