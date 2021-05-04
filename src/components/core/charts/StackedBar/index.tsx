import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { ICategorizedItem } from "~/components/core/charts/StackedBar/types";
import useData from "~/hooks/useData";

import { IData } from "~/providers/DataProvider/types";
import { BAR_HEIGHT, ChartContainer } from "./styles";
import { CATEGORIES, FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

import theme from "~/common/theme";

const type = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const dataset: ICategorizedItem[] = getDataset(type) as Array<ICategorizedItem>;

    // data for legends
    const parsedCategories: string[] = useMemo(
        () => dataset.length ? dataset.map((item: ICategorizedItem) => item.category) : [],
        [ dataset ]
    );

    // data for y axis
    const parsedMedia = useMemo(
        () => parsedCategories.length
            // remove "category" field, keep only media fields
            ? Object.keys(dataset[0]).filter((key: string) => !FILTER_BY_CATEGORY_INDEXES.includes(key))
            : [],
        [ parsedCategories ]
    );

    const percentages: Array<{ [key: string]: number }> = useMemo(() => dataset.length
        ? parsedMedia.map((media: string) => {
            return dataset.reduce((result: { [key: string]: number }, item: ICategorizedItem) => {
                result[item.category] = Number(item[media]);
                return result;
            }, {});
        })
        : [], [ dataset, parsedMedia ]);

    const colors = useMemo((): string[] => {
        // main colors (since we use top-5 according to requirements)
        const { orange, gray, cyan, green } = theme.palette;
        const mainColors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

        // random colors (if requirements will changed and categories amount will be greater than 5)
        const randomColors = parsedCategories.slice(5)
            .map((item: string) => `#${Math.floor(Math.random()*16777215).toString(16)}`);

        return mainColors.concat(randomColors);
    }, [ parsedCategories ]);

    const draw = useCallback((): void => {
        if (dataset.length) {
            const series = d3.stack().keys(parsedMedia)(dataset);

            const svg = d3.select(ref.current);

            const xScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
                .range ([ 0, 800 ])
                .domain([ 20, 40, 60, 80, 100 ]);

            const yScale: d3.ScaleBand<string> = d3.scaleBand()
                .range ([ 0, 800 ])
                .domain(parsedMedia);

            const zScale = d3.scaleOrdinal()
                .range(colors)
                .domain(parsedCategories);

            // draw xAxis
            svg.append("g")
                .attr("class", "x-axis")
                .call(d3
                    .axisTop(xScale)
                    .tickSize(0)
                    // x-axis will contains no text on scale
                    .tickFormat((d) => "")
                );

            // draw yAxis
            svg.append("g")
                .attr("class", "y-axis")
                .call(
                    d3.axisLeft(yScale)
                    .tickFormat((d: string) => d)
                    .ticks(parsedMedia.length)
                    .tickSize(0)
                    .tickPadding(20)
                );

            const group = svg.selectAll("g.group")
                .data(series)
                .attr("class", "group");

            group.enter().append("g")
                .attr("fill", (d) => {
                    console.log(zScale(d.category), d.key, d[0]);
                    return zScale(d[0][d.key]);
                });

            group.selectAll("rect").data(series)
                .enter().append("rect")
                .attr("x", (d, i) => xScale(d[0]))
                .attr("y", (d, i) => BAR_HEIGHT * i)
                .attr("width", (d) => 100)
                .attr("height", BAR_HEIGHT)
                .attr("fill", "red")

        }
    }, [ dataset ]);

    useEffect(() => {
        draw();
    }, [ dataset ]);

    return <ChartContainer ref={ref} itemsAmount={parsedMedia.length} />;
};

export default StackedBar;
