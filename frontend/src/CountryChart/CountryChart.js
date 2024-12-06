import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function CountryChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const width = 1500;
    const height = Math.min(width, 500);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.percentage);

    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.country))
      .range(
        d3
          .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [
        -width / 2 - radius * 0.2,
        -height / 2 - radius * 0.2,
        width + radius * 0.4,
        height + radius * 0.4
      ])
      .attr("style", "max-width: 100%; height: auto;")
      .attr("role", "img")
      .attr("aria-labelledby", "chart-title chart-desc");

    // Add chart title and description
    svg.append("title").attr("id", "chart-title").text("Geographical Distribution of Innovations");
    svg.append("desc").attr("id", "chart-desc").text(
      "A pie chart showing the percentage of universities per geographical area responsible for 17 top healthcare innovations."
    );

    // Clear previous content
    svg.selectAll("*").remove();

    // Add arcs
    const arcs = svg
      .append("g")
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("fill", d => color(d.data.country))
      .attr("d", arc)
      .attr("tabindex", "0")
      .attr("aria-label", d => `${d.data.country}: ${d.data.percentage}%`)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const [x, y] = arc.centroid(d);
            const distance = Math.min(radius * 0.1, 20);
            return `translate(${(x * distance) / radius}, ${(y * distance) / radius})`;
          })
          .attr("stroke", "#000")
          .attr("stroke-width", 1.5);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .attr("stroke", "none");
      })
      .append("title")
      .text(d => `${d.data.country}: ${d.data.percentage.toLocaleString()}%`);

    // Add text labels
    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.country)
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => `${d.data.percentage.toLocaleString("en-US")}%`)
      );
  }, [data]);

  return <svg ref={chartRef}></svg>;
}

export default CountryChart;
