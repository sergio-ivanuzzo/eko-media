import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

export const BAR_HEIGHT = 27;

const useDrawStackedBar = ({ data, xData, yData }: IUseStackedBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor } = useChartColor();

    const draw = useCallback(({ chartRef, width, height, colors }: IChartDrawProps): void => {

        const series = d3.stack()
            .keys(xData)
            // normalization
            .offset(d3.stackOffsetExpand)(data as any);

        const svg: any = d3.select(chartRef.current)
            .attr("preserveAspectRatio", "xMidYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", width)
            .attr("height", height);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const maxX = d3.max(data, (d: any) => d.total);

        const xScale = d3.scaleLinear()
            // .range([ 0, width ])
            .rangeRound([ 0, width ])
            .domain([ 0, 1 ])
            // .domain([ 0, 1.4 ]);

        const xScale2 = d3.scaleLinear()
            .range([ 0, width ])
            .domain([ 0, maxX ])

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height ])
            .padding(0.2)
            .domain(yData);

        // draw xAxis
        const xAxis = d3
            .axisTop(xScale)
            .tickSize(0)
            // x-axis will contains no text on scale
            .tickFormat(() => "");

        const gX = svg.append("g")
            .attr("class", "axis")
            .call(xAxis);

        // draw yAxis
        const yAxis = d3.axisLeft(yScale)
            .tickFormat((d: string) => d)
            .ticks(yData.length)
            .tickSize(0)
            .tickPadding(20);

        const gY = svg.append("g")
            .attr("class", "axis")
            .call(yAxis);

        const group = svg.append("g")
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d: any, index: number) => getColor({ index, colors }))
            .attr("class", (d: any, i: number) => `group-${i}`)


        const segment = group.selectAll("rect")
            .data((d: any) => d)
            .join("rect")
            .attr("class", "segment")
            .attr("x", (d: any) => xScale(d[0]) + 30)
            .attr("y", (d: any) => yScale(d.data.key))
            .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth());

        // svg.call(d3.zoom()
        //     .scaleExtent([ 1, 10 ])
        //     .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
        //         const transform = event.transform;
        //         xScale.domain(transform.rescaleX(xScale2).domain());
        //         const currentNode = d3.select(event.sourceEvent.target).node();
        //         const currentGroup = d3.select(currentNode.parentNode).node();
        //
        //         group.selectAll("rect.segment")
        //             // .attr("transform", event.transform.toString())
        //             .attr("x", (d: any, i, n) => {
        //                 if (n[i].parentNode === currentGroup) {
        //                     return xScale(d[0]) + 30;
        //                 }
        //                 return xScale2(d[0]) + 30;
        //             })
        //             .attr("width", (d: any, i: any, n: any) => {
        //                 if (n[i].parentNode === currentGroup) {
        //                     return xScale(d[1]) - xScale(d[0])
        //                 }
        //
        //                 return xScale2(d[1]) - xScale2(d[0])
        //             });
        //
        //         // svg.selectAll("rect.segment")
        //         //     .attr("transform", event.transform.toString())
        //         //     .attr("x", (d: any) => xScale(d[0]) + 30)
        //         //     .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]));
        //
        //     }) as any);
        //
        // svg.on("mousedown.zoom", null)
    }, [ data ]);

    return {
        draw
    }
};

export default useDrawStackedBar;

// stacked bar zoom
// const xKey = "month";
// const keys = d3.keys(data[0]).filter( (e) => e != xKey );
// const div = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);
//
// const margin = {
//         top: 20,
//         right: 50,
//         bottom: 30,
//         left: 50
//     },
//     width = 400,
//     height = 300,
//     padding = 100;
//
// const x = d3.scaleBand()
//     .rangeRound([ 0, width ])
//     .paddingInner(.05);
//
// const y = d3.scaleLinear().range([ height, 0 ]);
//
// const color = d3.scaleOrdinal(d3.schemeCategory10);
//
// const xAxis = d3.axisBottom().scale(x);
// const yAxis = d3.axisLeft().scale(y).ticks(6); //.innerTickSize(-width).tickPadding(10);
//
// const svg = d3.select("#ashu")
//     .append("svg")
//     .attr("width", "100%")
//     .attr("height", "100%");
//
// const clipPath = svg.append("defs")
//     .append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("width", width)
//     .attr("height", height);
//
// const g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// const dataStackLayout = d3.stack().keys(keys)(data);
// // add the key to the bar elements
// dataStackLayout.forEach((keyElem) => {
//     const key = keyElem.key;
//     keyElem.forEach((d) => { d.key = key; });
// });
//
// x.domain(dataStackLayout[0].map(function(d) { return d.data[xKey]; }));
// const maximumY = d3.max(dataStackLayout[dataStackLayout.length - 1], function(d) { return d[1]; });
// y.domain([ 0.1, maximumY ]);
//
// const gBars = g.append("g")
//     .attr("class", "bars")
//     .attr("clip-path", "url(#clip)");
//
// gBars.selectAll("g")
//     .data(dataStackLayout)
//     .enter().append("g")
//     .attr("fill", function(d) { return color(d.key); })
//     .selectAll("rect")
//     .data(function(d) { return d; })
//     .enter().append("rect")
//     .attr("x", function(d) { return x(d.data[xKey]); })
//     .attr("y", function(d) { return y(d[1]); })
//     .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//     .attr("width", x.bandwidth())
//     .append("title").text(function(d) { return d.key; });
//
// g.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
//
// const gY = g.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(0,0)")
//     .call(yAxis);
//
// const legend = g.selectAll(".legend")
//     .data(color.domain().slice())
//     .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d, i) { return "translate(0," + Math.abs((i - 8) * 20) + ")"; });
//
// legend.append("rect")
//     .attr("x", width + 10)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", color);
//
// legend.append("text")
//     .attr("x", width + 32)
//     .attr("y", 10)
//     .attr("dy", ".35em")
//     .style("text-anchor", "start")
//     .text(function(d, i) { return keys[i]; });
//
// const zoom = d3.zoom()
//     .scaleExtent([ 1, 40 ])
//     .on("zoom", zoomed);
//
// svg.call(zoom);
//
// d3.select("button")
//     .on("click", resetted);
//
// function zoomed() {
//     // https://stackoverflow.com/a/44359905/9938317
//     const t = d3.event.transform;
//     t.y = d3.min([ t.y, 0 ]);
//     t.y = d3.max([ t.y, (1-t.k) * height ]);
//     const yTransform = t.rescaleY(y);
//     gY.call(yAxis.scale(yTransform));
//     gBars.selectAll("rect")
//         .attr("y", function(d) { return yTransform(d[1]); })
//         .attr("height", function(d) { return yTransform(d[0]) - yTransform(d[1]); });
// }
//
// function resetted() {
//     svg.transition()
//         .duration(750)
//         .call(zoom.transform, d3.zoomIdentity);
// }
