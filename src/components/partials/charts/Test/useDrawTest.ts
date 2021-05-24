import { useCallback } from "react";
import * as d3 from "d3";

import randomize from "~/helpers/randomize";
import useChartColor from "~/hooks/useChart/color/useChartColor";

interface IUseDrawTestProps {
    data: any;
    selectedCategories: any;
}

const useDrawTest = ({ data, selectedCategories }: IUseDrawTestProps) => {
    const { getColor, getColorIndexByCategory } = useChartColor();

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const categoriesCount = selectedCategories.length;
        const clusters = new Array(categoriesCount);

        let centers: Array<[number, number]> = [];

        const zero = 50;

        if (selectedCategories.length === 1) {
            centers = [ [ width / 2, height / 2 ] ];
        } else {
            // according to current requirements we can build 5 or 1 bubble chart
            centers = [
                [ zero, zero ],
                [ width - zero, zero ],
                [ width / 2 - zero, height / 2 - zero ],
                [ zero, height - zero ],
                [ width - zero, height - zero ]
            ];
        }

        const nodes = d3.range(data.length).map(function(index) {
            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = selectedCategories.findIndex(
                (category: string) => category.toLowerCase() === currentCategory.toLowerCase()
            );

            const [ cx, cy ] = centers[clusterIndex];

            const currentItems = data.filter((item) => item.category.toLowerCase() === currentCategory.toLowerCase());
            const maxRadius = Math.max(...currentItems.map((item) => item.radius));

            const div = 360 / currentItems.length;
            const offsetX = randomize(-radius, radius);
            const offsetY = randomize(-radius, radius);

            const y = cy - Math.sin((div * index) * (Math.PI / 180)) * radius * 2;
            const x = cx - Math.cos((div * index) * (Math.PI / 180)) * radius * 2;

            const d = {
                cluster: clusterIndex,
                radius,
                x,
                y,
                word,
                wordCount,
                category: currentCategory
            };

            if (!clusters[clusterIndex] || (radius > clusters[clusterIndex].radius)) {
                clusters[clusterIndex] = d;
            }

            return d;
        });

        // const simulation = d3.forceSimulation(nodes)
        //     // .force("center", d3.forceCenter(width / 2, height / 2))
        //     // .force("x", d3.forceX().x((d: any) => centers[d.cluster][1]).strength(0.005))
        //     // .force("y", d3.forceY().y((d: any) => centers[d.cluster][0]).strength(0.5))
        //     // .force("cluster", cluster(nodes).strength(0.5))
        //     // .force("charge", d3.forceManyBody().strength(100.05))
        //     .force("collision", d3.forceCollide().radius((d: any) => d.radius));
        //
        // simulation.stop();
        // simulation.tick(nodes.length * 2);

        const svg: any = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        // svg.append("circle")
        //     .attr("cx", width / 2)
        //     .attr("cy", height / 2)
        //     .attr("r", 100)
        //     .attr("fill", "red");
        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble");

        node.append("circle")
            .attr("fill", (d: any) => {
                const index = getColorIndexByCategory(d.category);
                return getColor(index, { randomShade: true, randomOpacity: true });
            })
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.radius);

        node.append("title").text((d) => `${d.category}: ${d.word}`);

        node.append("text")
            .text((d) => d.word)
            .attr("dy", () => "0.3em")
            .attr("font-size", 25)
            .attr("text-anchor", "middle")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y);

    }, [ data ]);

    return {
        draw
    };
};

export default useDrawTest;
