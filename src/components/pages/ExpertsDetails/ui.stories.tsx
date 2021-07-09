import React, { useContext, useEffect } from "react";

import UIPage from "./index";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import { DataContext } from "~/providers/DataProvider";
import { CATEGORIES_MAP, MOCK_DATE } from "~/common/constants";

export default {
    title: "Components/Pages"
};

export const ExpertsDetailsPage = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { data, loadAll, selectedCategory, setCategory, isDataLoading } = useData();
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

    // if topic_all file exists we can remove this part
    // here I just try to get first category loaded from category_all
    useEffect(() => {
        if (!isDataLoading && selectedCategory === "all") {
            const month = date.toLocaleString("en-US", { month: "2-digit" });
            const year = date.getFullYear().toString();

            const item = data[`category_all_${month}_${year}`][0];
            const category = Object.keys(CATEGORIES_MAP)
                .find((key) => CATEGORIES_MAP[key].toLowerCase() === `${item.category}`.toLowerCase());

            setCategory(category);
        }
    }, [ data, date, selectedCategory ]);

    return (
        <ConditionalRender condition={!isDataLoading}>
            <UIPage />
        </ConditionalRender>
    );
};
