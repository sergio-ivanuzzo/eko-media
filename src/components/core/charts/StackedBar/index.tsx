import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { CATEGORIES, TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

import { ChartContainer } from "./styles";

const type = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { filter } = useData();
    const ref = useRef<HTMLDivElement>(null);

    const data: IData = filter(type);

    const draw = (): void => {
        d3.select(ref.current)//.data(items);
    };

    useEffect(() => {
        draw();
    }, [ data ]);

    return <ChartContainer ref={ref} />;
};

export default StackedBar;
