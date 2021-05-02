import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { CATEGORIES, TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

import { SvgContainer } from "./styles";

const type = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { filter } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const data: IData = filter(type);

    const draw = (): void => {
        const svg = d3.select(ref.current);
    };

    useEffect(() => {
        draw();
    }, [ data ]);

    return <SvgContainer ref={ref} />;
};

export default StackedBar;
