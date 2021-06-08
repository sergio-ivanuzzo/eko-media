import React, { useContext, useEffect } from "react";

import UIArticleBar from "./ArticleBar";
import UISphereBar from "./SphereBar";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import { DataContext } from "~/providers/DataProvider";
import { CATEGORIES_MAP, MOCK_DATE } from "~/common/constants";

export default {
    title: "Components/Charts"
};

export const SphereBar = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { isDataLoaded, loadAll } = useData();
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
        <ConditionalRender condition={isDataLoaded}>
            <UISphereBar />
        </ConditionalRender>
    );
};

export const ArticleBar = (): JSX.Element => {
    // for story we use similar flow as we use for datepicker, bc we need to load some data into data provider
    const { data, loadAll, selectedCategory, isDataLoaded } = useData();
    const { date, setDate, setCategory } = useContext<IDataProviderContext<IItem>>(DataContext);

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
        if (isDataLoaded && selectedCategory === "all") {
            const month = date.toLocaleString("en-US", { month: "2-digit" });
            const year = date.getFullYear().toString();

            const item = data[`category_all_${month}_${year}`][0];
            const category = Object.keys(CATEGORIES_MAP)
                .find((key) => CATEGORIES_MAP[key].toLowerCase() === `${item.category}`.toLowerCase());
            
            setCategory(category);
        }
    }, [ data, date, selectedCategory ]);

    return (
        <ConditionalRender condition={isDataLoaded}>
            <UIArticleBar />
        </ConditionalRender>
    );
};
