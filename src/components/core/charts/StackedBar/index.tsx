import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { CATEGORIES, FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

import { IData } from "~/providers/DataProvider/types";

import { BAR_HEIGHT, ChartContainer } from "./styles";
import { ICategorizedItem } from "~/components/core/charts/StackedBar/types";

const type = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const data: ICategorizedItem[] = getDataset(type);
    // data for legends
    const parsedCategories: string[] = useMemo(
        () => data.length ? data.map((item: ICategorizedItem) => item.category) : [],
        [ data ]
    );
    // data for y axis
    const parsedMedia = useMemo(
        () => parsedCategories.length
            // remove "category" field, keep only media fields
            ? Object.keys(data[0]).filter((key: string) => !FILTER_BY_CATEGORY_INDEXES.includes(key))
            : [],
        [ parsedCategories ]
    );

    // max value (100%) for each category
    const percentagesMap = useMemo(() => data.length ? data.reduce((result, item: ICategorizedItem) => {
        result[item.category] = Math.max(amounts);
    }, {}) : [], [ data ]);

    const height = useMemo(() => BAR_HEIGHT * parsedMedia.length, [ parsedMedia ]);

    const draw = useCallback((): void => {
        if (data.length) {
            const svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined> = d3.select(ref.current);
            // this is group element for SVG
            const g: d3.Selection<SVGGElement, unknown, null, undefined> = svg.append("g").attr("class", "root");
            // TODO: refactor 700 into const
            // TODO: refactor 0.5 into const
            // const xScale: d3.ScaleBand<string> = d3.scaleBand()
            //     .range ([ 0, 800 ])
            //     .domain(parsedCategories);
            // const yScale: d3.ScaleLinear<number, number> = d3
            //     .scaleLinear()
            //     .range ([ 0, BAR_HEIGHT * parsedMedia.length ])
            //     .domain([ 0, parsedMedia.length - 1 ]);
            const xScale: d3.ScaleLinear<number, number> = d3
                .scaleLinear()
                .range ([ 0, 800 ])
                .domain([ 0, parsedCategories.length ]);
            const yScale: d3.ScaleBand<string> = d3.scaleBand()
                .range ([ 0, 800 ])
                .domain(parsedMedia);

            const stack = d3.stack().keys(parsedMedia);
            console.log(stack(data));

            g.append("g").call(d3.axisTop(xScale).tickSize(0).tickFormat((d) => ""))
            g.append("g").attr("class", "tick").call(
                d3.axisLeft(yScale).tickFormat((d: string) => d).ticks(parsedMedia.length).tickSize(0).tickPadding(20)
            );

            g.selectAll("rect").data(parsedMedia)
                .enter().append("rect")
                .attr("x", (d, i) => xScale(i))
                .attr("y", (d, i) => i)
                .attr("width", (d) => 100)
                .attr("height", yScale.bandwidth())
                .attr("fill", "red")
        }
    }, [ data ]);

    useEffect(() => {
        draw();
    }, [ data ]);

    return <ChartContainer ref={ref} height={height} />;
};

export default StackedBar;
