import React, { useContext, useEffect } from "react";

import UIArrowChart from "./index";
import useData from "~/hooks/useData";

import { DataContext } from "~/providers/DataProvider";
import { MOCK_DATE } from "~/common/constants";

export default {
    title: "Components/Charts"
};

export const ArrowChart = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { loadAll } = useData();
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

    return <UIArrowChart />;
};
