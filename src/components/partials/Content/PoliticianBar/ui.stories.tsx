import React, { useContext, useEffect } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import UIPoliticianBar from "./index";
import useData from "~/hooks/useData";

import { DataContext } from "~/providers/DataProvider";

export default {
    title: "Components/Partials/Content"
};


export const PoliticianBar = (): JSX.Element => {
    const { data, loadAll } = useData();
    const { date } = useContext<IDataProviderContext<IItem>>(DataContext);

    useEffect(() => {
        (async (): Promise<void> => {
            await loadAll();
        })();
    }, [ date ]);

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <UIPoliticianBar />
        </ConditionalRender>
    );
};
