import React, { useContext, useEffect } from "react";

import StackedBar from "./index";
import useData from "~/hooks/useData";

import { DataContext } from "~/providers/DataProvider";
import { IDataProviderContext, IItem } from "~/providers/DataProvider/types";


export default {
    title: "Components/Charts"
};

export const SimpleStackedBar = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { loadAll } = useData();
    const { date } = useContext<IDataProviderContext<IItem>>(DataContext);

    useEffect(() => {
        (async (): Promise<void> => {
            await loadAll();
        })();
    }, [ date ]);

    return <StackedBar />;
};