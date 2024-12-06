import React, { useEffect, useState } from "react";
import ResultsChart from "../ResultsChart/ResultsChart";

function Reports() {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await fetch("http://147.182.166.163:3000/resultsData");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setResultsData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResultsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="summary" role="main" aria-labelledby="summary_heading">
      <h1 id="summary_heading" tabIndex="0">
        Summary
      </h1>

      <section aria-labelledby="chart_heading">
        <h2 id="chart_heading" tabIndex="0">
          Results Chart
        </h2>
        <ResultsChart data={resultsData} aria-describedby="chart_description" />
        <p id="chart_description">
          This chart provides insight into the study results. It illustrates the
          total percentage of bacterial cells dispersed in vitro after the
          introduction of certain treatments. Cells treated with the glycoside
          hydrolases were more dispersed than the control or the
          heat-inactivated glycoside hydrolases.
        </p>
      </section>

      <section aria-labelledby="source_heading">
        <h2 id="source_heading" tabIndex="0">
          Source Information
        </h2>
        <p>
          Source:{" "}
          <a
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5278739/#:~:text=Glycoside%20hydrolase%20therapy%20increases%20antibiotic,dwelling%20bacteria%20adopt%20(32)"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source article on Glycoside hydrolase therapy"
          >
            Glycoside Hydrolase Therapy Study
          </a>
        </p>
      </section>
    </div>
  );
}

export default Reports;
