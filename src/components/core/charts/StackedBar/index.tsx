import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { CATEGORIES, TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

import { ChartContainer } from "./styles";

const type = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const data: IItem[] = getDataset(type);

    const draw = (): void => {
        const svg = d3.select(ref.current).data(data);
    };

    useEffect(() => {
        draw();
    }, [ data ]);

    return <ChartContainer ref={ref} />;
};

export default StackedBar;
