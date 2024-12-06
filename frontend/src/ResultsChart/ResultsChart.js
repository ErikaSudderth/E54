import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function ResultsChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    // Clear the chart container before rendering a new chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Chart dimensions and margins
    const width = 300;
    const height = 300;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 60;
    const marginLeft = 40;

    // x (horizontal position) scale
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.drugName))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    // y (vertical position) scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.percentageCellsDisplaced)])
      .nice()
      .range([height - marginBottom, marginTop]);

    // Create the SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .attr("role", "img")
      .attr("aria-labelledby", "chart-title chart-desc");

    // Add chart title and description
    svg.append("title").attr("id", "chart-title").text("Results Chart");
    svg
      .append("desc")
      .attr("id", "chart-desc")
      .text(
        "A bar chart showing the percentage of cells displaced after treatments with various drugs."
      );

    // Create a tooltip element
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "3px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Add a rect for each bar
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.drugName))
      .attr("y", d => y(d.percentageCellsDisplaced))
      .attr("height", d => y(0) - y(d.percentageCellsDisplaced))
      .attr("width", x.bandwidth())
      .attr("tabindex", "0")
      .attr(
        "aria-label",
        d => `${d.drugName}: ${d.percentageCellsDisplaced}% of cells displaced`
      )
      .on("mouseover focus", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.drugName}</strong>: ${d.percentageCellsDisplaced}%`
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mousemove", event => {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout blur", () => {
        tooltip.style("opacity", 0);
      });

    // Add the x-axis and label
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add the y-axis and label, and remove the domain line
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Percentage Cells Displaced")
      );
  }, [data]);

  return <div id="resultsChart" ref={chartRef}></div>;
}

export default ResultsChart;
