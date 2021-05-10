import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { ICategorizedItem } from "~/components/charts/StackedBar/types";
import useData from "~/hooks/useData";

import { BAR_HEIGHT, ChartContainer } from "./styles";
import { FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

import theme from "~/common/theme";

const TYPE = TYPES.CATEGORY

const StackedBar = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const dataset: ICategorizedItem[] = getDataset(TYPE) as Array<ICategorizedItem>;

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

    const getColors = useCallback((items: Array<any>): string[] => {
        // main colors (since we use top-5 according to requirements)
        const { orange, gray, cyan, green } = theme.palette;
        const mainColors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

        // random colors (if requirements will changed and categories amount will be greater than 5)
        const randomColors = items.slice(5)
            .map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);

        return mainColors.concat(randomColors);
    }, []);

    const colors = getColors(parsedMedia);

    const margin = ({ top: 30, right: 10, bottom: 0, left: 30 });

    const height = useMemo(() =>
        parsedMedia.length
            ? BAR_HEIGHT * parsedMedia.length - margin.top - margin.bottom
            : 0,
        [ parsedMedia ]);

    // TODO: refactor all ANY and all MAGIC NUMBERS
    const width = 1000 - margin.left - margin.right;

    const data = useMemo(() => {
        return parsedMedia.map((media: string) => {
            return {
                key: media,
                ...parsedCategories.reduce((result: { [key: string]: number }, category, index) => {
                    result[category] = Number(dataset[index][media])
                    return result;
                }, {})
            }
        });
    }, [ dataset ]);

    const draw = useCallback((): void => {
        if (dataset.length) {
            const series = d3.stack()
                .keys(parsedCategories)
                // normalization
                .offset(d3.stackOffsetExpand)(data as any);

            const svg: any = d3.select(ref.current);

            const xScale = d3.scaleLinear()
                .rangeRound([ margin.left, width ]).domain([ 0, 1.5 ]);

            const yScale: d3.ScaleBand<string> = d3.scaleBand()
                .range([ margin.left, height ])
                .padding(0.2)
                .domain(parsedMedia);

            // draw xAxis
            svg.append("g")
                .attr("class", "axis")
                .call(d3
                    .axisTop(xScale)
                    .tickSize(0)
                    // x-axis will contains no text on scale
                    .tickFormat((d) => "")
                );

            // draw yAxis
            svg.append("g")
                .attr("class", "axis")
                .call(
                    d3.axisLeft(yScale)
                    .tickFormat((d: string) => d)
                    .ticks(parsedMedia.length)
                    .tickSize(0)
                    .tickPadding(20)
                );

            svg.append("g")
                .selectAll("g")
                .data(series)
                .enter().append("g")
                .attr("fill", (d: any, i: any) => colors[i])
                .selectAll("rect")
                .data((d: any) => d)
                .join("rect")
                .attr("x", (d: any) => xScale(d[0]))
                .attr("y", (d: any, i: any) => yScale(d.data.key))
                .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
                .attr("height", yScale.bandwidth())

        }
    }, [ dataset ]);

    useEffect(() => {
        draw();
    }, [ dataset ]);

    return <ChartContainer ref={ref} height={height} width={width} />;
};

export default StackedBar;